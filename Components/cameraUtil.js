import * as ImagePicker from 'expo-image-picker';

export const verifyPermissions = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.status !== 'granted') {
        alert('You need to grant camera permissions to use this feature.');
        return false;
    }
    return true;
};

export const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
        return;
    }
    const imageResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
    });
    //console.log(imageResult)

    if (!imageResult.canceled) {
       // console.log(imageResult.assets[0].uri)
        return imageResult.assets[0].uri;

    }
};
