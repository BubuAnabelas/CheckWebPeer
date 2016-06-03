const hat = require('hat');
const zeroFill = require('zero-fill');
const Tracker = require('bittorrent-tracker');
const Parse = require('parse-torrent');
const log = require('./log');

const VERSION = require('../package.json').version;
const CLIENT = '-OT';
const VERSION_CLIENT = ''.concat(CLIENT, VERSION.match(/([0-9]+)/g).slice(0, 2).map(zeroFill(2)).join(''), '-');

const announceList = ['wss://tracker.openwebtorrent.com/', 'wss://tracker.webtorrent.io','wss://tracker.btorrent.xyz','wss://tracker.fastcast.nz'];
announceList.sort();

var completedList = [];

const defaultOpts = {
	peerId: new Buffer(VERSION_CLIENT + hat(48)),
	announce: announceList
};

function checkTorrent (magnet) {
	try {
		return Parse(magnet);
	} catch (e) {
		log.error(e)
		return;
	}
}

function createClient (opts) {
	client = new Tracker(opts);
	client.on('error', function (err) {
		log.error(err)
	});

	client.on('warning', function (err) {
		log.error(err)
	});

	log.results(''.concat('<h4>Torrent: ', opts.infoHash, '</h4>'));
	client.scrape();

	client.on('scrape', function (data) {
		var msg = ''.concat(
			'Tracker: ', data.announce, '<br />',
			'Seeds: ', data.complete, '<br />',
			'Peers: ', data.incomplete);
		log.results(msg);
		if (!completedList.includes(data.announce)) {
			completedList.push(data.announce);
			completedList.sort();
		} else if (completedList.length == announceList.length) {
			client.destroy();
			completedList = [];
		};
	});
}

document.querySelector('form').addEventListener('submit', function (e) {
	e.preventDefault();
	var magnet = checkTorrent(document.querySelector('form input[id=magnet]').value.trim());
	if (magnet) {
		var opts = defaultOpts;
		opts.infoHash = magnet.infoHash;
		createClient(opts);
	}
});