export const environment = {
  production: true,
  environment: 'PROD',
  walletAPI: 'https://api.wallet.conceal.network/api',
	wsEndpoint: 'ws://192.168.1.214:8081/',
	RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302'
      }
    ]
  }
};