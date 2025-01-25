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

const qrScanner = new Html5Qrcode("reader");

const config = {
	qrScan: {
		fps: 10,
		qrbox: {
			width: 250,
			height: 250
		},
		supportedScanTypes: [ Html5QrcodeScanType.SCAN_TYPE_CAMERA ]
	}
};

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
	try {
		console.log(decodedResult);
		let p = document.createElement('p');
		p.textContent = 'Code matched = ' + decodedText;
		qrReaderResult.append(p);
		qrScanner.stop();
	} catch(e) {
		console.log(e);
	}
};

Html5Qrcode.getCameras().then(devices => {
	try {
		var cameraId = devices[1].id;
		qrScanner.start(cameraId, config.qrScan, qrCodeSuccessCallback);
		//qrScanner.start({ facingMode: "environment" }, config.qrScan, qrCodeSuccessCallback);
	} catch(e) {
		console.log(e);
	}
});
