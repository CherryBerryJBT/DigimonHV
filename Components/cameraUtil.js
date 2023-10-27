import * as ImagePicker from 'expo-image-picker';

export const verifyPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return false;
    }
    return true;
};

export const pickImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
        return null;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        return result.uri;
    }
    return null;
};

export const takeNewPhoto = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
        return null;
    }

    let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        return result.uri;
    }
    return null;
};
