/* Method #1 */
/*
function onScanSuccess(decodedText, decodedResult) {
	try {
		console.log(decodedResult);
		let p = document.createElement('p');
		p.textContent = 'Code matched = ' + decodedText;
		qrReaderResult.append(p);
		qrScanner.clear();
	} catch(e) {
		console.log(e);
	}
}

function onScanFailure(error) {
	// handle scan failure, usually better to ignore and keep scanning
	// console.log(`Code scan error = ${error}`);
}

let qrScanner = new Html5QrcodeScanner("qrReader", { fps: 24, qrbox: {width: 350, height: 350} }, false);
qrScanner.render(onScanSuccess, onScanFailure);
*/

/* Method #2 */

const qrScanner = new Html5Qrcode("qrReader");

const config = {
	qrScan: {
		fps: 30,
		qrbox: {
			width: 250,
			height: 250
		},
		supportedScanTypes: [ Html5QrcodeScanType.SCAN_TYPE_CAMERA ]
	}
};

const scanResult = {};

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
	try {
		console.log(decodedResult);
		scanResult = decodedResult.result;
		printContent(decodedText, decodedResult);
		qrScanner.pause();
	} catch(e) {
		console.log(e);
	}
};

qrScanner.start({ facingMode: "environment" }, config.qrScan, qrCodeSuccessCallback);

qrReaderResult.animation = () => {
	if (qrReaderResult.className === 'result-show') {
		qrReaderResult.className = 'result-hide';
		shade.className = 'hide';
		qrScanner.resume();
	} else {
		qrReaderResult.className = 'result-show';
		shade.className = 'shade';
	}
}

const printContent = (decodedText, decodedResult) => {
	try {
		qrReaderResult.innerHTML = '';
		let p = document.createElement('p');
		p.textContent = 'Code matched = ' + decodedText;
		qrReaderResult.append(p);
		qrReaderResult.animation();
	} catch(e) {
		console.log(e);
	}
};

const shareContent = () => {
	if (navigator.share) {
		navigator.share({
			title: scanResult.format.formatName,
			text: scanResult.text
		}).then(() => alert('Successful share'))
		.catch((e) => console.log('Error sharing', e));
	}
}
