import type { Peer, DataConnection } from 'peerjs';
import type { NetworkMessage } from '../types';

export type NetworkEventCallback = (msg: NetworkMessage) => void;
export type StatusCallback = (status: 'disconnected' | 'connecting' | 'connected' | 'error', detail?: string) => void;

const ID_PREFIX = 'skyward-inv-';

export class P2PNetwork {
  private peer: Peer | null = null;
  private conn: DataConnection | null = null;
  private onMessageCb: NetworkEventCallback | null = null;
  private onStatusCb: StatusCallback | null = null;
  public roomCode: string = '';
  public isHost: boolean = false;

  constructor() {}

  public setCallbacks(onMessage: NetworkEventCallback, onStatus: StatusCallback) {
    this.onMessageCb = onMessage;
    this.onStatusCb = onStatus;
  }

  /**
   * Gera um código de sala amigável de 5 letras maiúsculas (ex: "AEROX", "ZEFYR")
   */
  public generateRoomCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sem O, 0, 1, I para evitar confusão visual
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  /**
   * Host: Cria a sala P2P com o código de 5 letras
   */
  public async hostRoom(code?: string): Promise<string> {
    this.isHost = true;
    this.roomCode = code ? code.toUpperCase() : this.generateRoomCode();
    const peerId = `${ID_PREFIX}${this.roomCode}`;

    this.onStatusCb?.('connecting', `Criando sala [${this.roomCode}]...`);

    // Import dinâmico para garantir execução puramente no navegador
    const { Peer } = await import('peerjs');

    return new Promise((resolve, reject) => {
      try {
        this.peer = new Peer(peerId, {
          debug: 1
        });

        this.peer.on('open', (id) => {
          this.onStatusCb?.('connecting', `Sala aberta! Aguardando oponente no código: ${this.roomCode}`);
          resolve(this.roomCode);
        });

        this.peer.on('connection', (incomingConn) => {
          this.conn = incomingConn;
          this.setupConnectionListeners();
          this.onStatusCb?.('connected', 'Oponente conectado via P2P!');
        });

        this.peer.on('error', (err) => {
          console.error('[P2P Host Error]', err);
          this.onStatusCb?.('error', `Erro na sala: ${err.type || err.message}`);
          reject(err);
        });
      } catch (err: any) {
        this.onStatusCb?.('error', err?.message || 'Falha ao inicializar Peer');
        reject(err);
      }
    });
  }

  /**
   * Guest: Conecta à sala existente usando o código de 5 letras
   */
  public async joinRoom(code: string): Promise<void> {
    this.isHost = false;
    this.roomCode = code.trim().toUpperCase();
    const hostPeerId = `${ID_PREFIX}${this.roomCode}`;

    this.onStatusCb?.('connecting', `Localizando sala [${this.roomCode}]...`);

    const { Peer } = await import('peerjs');

    return new Promise((resolve, reject) => {
      try {
        this.peer = new Peer({ debug: 1 });

        this.peer.on('open', () => {
          if (!this.peer) return;
          this.conn = this.peer.connect(hostPeerId, { reliable: true });

          this.conn.on('open', () => {
            this.setupConnectionListeners();
            this.onStatusCb?.('connected', `Conectado com sucesso à sala ${this.roomCode}!`);
            resolve();
          });

          this.conn.on('error', (err) => {
            console.error('[P2P Connection Error]', err);
            this.onStatusCb?.('error', `Falha na conexão: ${err.message}`);
            reject(err);
          });
        });

        this.peer.on('error', (err) => {
          console.error('[P2P Guest Error]', err);
          this.onStatusCb?.('error', `Não foi possível conectar: sala não encontrada ou erro de rede.`);
          reject(err);
        });
      } catch (err: any) {
        this.onStatusCb?.('error', err?.message || 'Falha ao conectar');
        reject(err);
      }
    });
  }

  private setupConnectionListeners() {
    if (!this.conn) return;

    this.conn.on('data', (data) => {
      try {
        const msg = (typeof data === 'string' ? JSON.parse(data) : data) as NetworkMessage;
        this.onMessageCb?.(msg);
      } catch (e) {
        console.error('[P2P Receive Error]', e, data);
      }
    });

    this.conn.on('close', () => {
      this.onStatusCb?.('disconnected', 'A conexão P2P com o adversário foi encerrada.');
    });
  }

  /**
   * Envia uma mensagem via DataConnection P2P
   */
  public send(msg: NetworkMessage) {
    if (this.conn && this.conn.open) {
      this.conn.send(msg);
    }
  }

  /**
   * Encerra conexões e libera recursos
   */
  public disconnect() {
    if (this.conn) {
      try { this.conn.close(); } catch (_) {}
      this.conn = null;
    }
    if (this.peer) {
      try { this.peer.destroy(); } catch (_) {}
      this.peer = null;
    }
    this.onStatusCb?.('disconnected');
  }
}

export const networkManager = new P2PNetwork();
