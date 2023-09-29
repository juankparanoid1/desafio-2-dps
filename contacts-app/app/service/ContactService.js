import AsyncStorage from '@react-native-async-storage/async-storage';

export const getContactList = async (id) => {
    try {
        const contactStorage = await AsyncStorage.getItem('contactList');
        if (contactStorage) {
            const contacts = JSON.parse(contactStorage);
            return contacts.filter(contact => contact.userId === id);
        }else{
            AsyncStorage.setItem('contactList', JSON.stringify([]));
        }
        return [];
    } catch (error) {
        console.log(error);
    }
};

export const deleteContact = async (id) => {
    const contactStorage = await AsyncStorage.getItem('contactList');
    if (contactStorage) {
        const contactList = JSON.parse(contactStorage);
        const contactFilter = contactList?.filter(contact => contact.id !== id);
        saveNewContact(contactFilter, true)
    }
}

export const saveNewContact = async (contact, isDelete = false) => {
    try {
        if (isDelete) {
            await AsyncStorage.setItem('contactList', JSON.stringify(contact));
        } else {
            const contactStorage = await AsyncStorage.getItem('contactList') ?? [];
            if (contactStorage) {
                const contacts = JSON.parse(contactStorage);
                const newContact = [...contacts, contact];
                await AsyncStorage.setItem('contactList', JSON.stringify(newContact));
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}