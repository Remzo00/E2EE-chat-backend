export const encryptData = (data) => {
  try {
    return Buffer.from(data).toString("base64");
  } catch (error) {
    throw new Error("Error encrypting data: " + error.message);
  }
};

export const decryptData = (base64Data) => {
  try {
    return Buffer.from(base64Data, "base64").toString("utf-8");
  } catch (error) {
    throw new Error("Error decrypting data: " + error.message);
  }
};

export const prepareEncryptedMessage = (data) => {
  try {
    const base64EncryptedData = encryptData(data.encryptedData);
    const base64IV = encryptData(data.iv);

    return {
      encryptedData: base64EncryptedData,
      iv: base64IV,
      room: data.room,
      senderName: data.senderName,
    };
  } catch (error) {
    throw new Error("Error preparing encrypted message: " + error.message);
  }
};
