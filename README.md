# CheckWebPeer

### Check WebRTC peers of torrents.

Check for WebRTC peers using the [WebTorrent](http://webtorrent.io) protocol (BitTorrent
over WebRTC).

To see a demo visit [this](https://bubuanablas.github.io/CheckWebPeer/) and try with this info hash: `6a9759bffd5c0af65319979fb7832189f4f3c35d`

## How does it work?

CheckWebPeer takes advantage of [bittorrent-tracker](https://github.com/feross/bittorrent-tracker)'s client and scrapes the (currently) 4 websocket trackers:

~~~
wss://tracker.openwebtorrent.com/
wss://tracker.webtorrent.io
wss://tracker.btorrent.xyz
wss://tracker.fastcast.nz
~~~

The client runs client-sided so it's not necessary to host it in a server, and it's pretty simple to understand as most of the code it's reused and adapted from [bittorrent-tracker](https://github.com/feross/bittorrent-tracker) and [instant.io](https://instant.io).

## License

MIT. Copyright (c) [Joaquín Serna](http://www.github.com/BubuAnabaleas).
