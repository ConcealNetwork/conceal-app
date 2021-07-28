export const environment = {
  production: true,
  environment: 'PROD',
  walletAPI: 'https://api.wallet.conceal.network/api',
	wsEndpoint: 'wss://supportccx.com',
	RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302'
      }
    ]
  }
};