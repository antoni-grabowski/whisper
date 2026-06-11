import _sodium from "libsodium-wrappers";

await _sodium.ready;

export function getKeyPair() {
  return _sodium.crypto_box_keypair();
}

export function encryptMessage(
  message: string,
  receiverPublicKey: string,
  senderPrivateKey: string,
) {
  const nonce = _sodium.randombytes_buf(_sodium.crypto_box_NONCEBYTES);
  return [
    _sodium.to_base64(
      _sodium.crypto_box_easy(
        message,
        nonce,
        _sodium.from_base64(receiverPublicKey),
        _sodium.from_base64(senderPrivateKey),
      ),
    ),
    _sodium.to_base64(nonce),
  ];
}

export function decryptMessage(
  message: string,
  receiverPublicKey: string,
  senderPrivateKey: string,
  nonce: string,
) {
  const rawMessage = _sodium.from_base64(message);
  return _sodium.to_string(
    _sodium.crypto_box_open_easy(
      rawMessage,
      _sodium.from_base64(nonce),
      _sodium.from_base64(receiverPublicKey),
      _sodium.from_base64(senderPrivateKey),
    ),
  );
}
