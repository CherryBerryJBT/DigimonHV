import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Items from "../Components/Items";
import Camera from "../Components/camera";
import Digimons from "../Components/digimons";
import { JokeComponent } from "../Components/jokes";
import Settings from "../Login/Settings";
import Profile from "../Login/Profile";
import Calculator from "../Components/calculator";
import Notes from "../Components/notes";
import Todo from "../Components/todo";
import Diary from "../Components/Diary";
import Shop from "../Components/shop";
import CalendarMain from '../calendar/CalendarMain';
import OpenAISearch from '../Components/openAISearch';
import Photos from "../Components/photos";
import DraggableButton, { ButtonPositionProvider } from '../Style/DraggableButton';
import { ItemsProvider } from '../Workspace/ItemsContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function Digivice() {
    const [itemsModalVisible, setItemsModalVisible] = useState(false);
    const [cameraModalVisible, setCameraModalVisible] = useState(false);
    const [digimonsModalVisible, setDigimonsModalVisible] = useState(false);
    const [CalendarMainModalVisible, setCalendarMainModalVisible] = useState(false);
    const [OpenAISearchModalVisible, setOpenAISearchModalVisible] = useState(false);
    const [PhotosModalVisible, setPhotosModalVisible] = useState(false);
    const [jokesModalVisible, setjokesModalVisible] = useState(false);
    const [SettingsModalVisible, setSettingsModalVisible] = useState(false);
    const [ProfileModalVisible, setProfileModalVisible] = useState(false);
    const [CalculatorModalVisible, setCalculatorModalVisible] = useState(false);
    const [NotesModalVisible, setNotesModalVisible] = useState(false);
    const [TodoModalVisible, setTodoModalVisible] = useState(false);
    const [DiaryModalVisible, setDiaryModalVisible] = useState(false);
    const [ShopModalVisible, setShopModalVisible] = useState(false);

    return (
        <ImageBackground source={require("../assets/BagpackBackgroundDigimon1.jpg")} style={styles.container}>
             <ItemsProvider>
        {/*<View style={styles.container}>*/}
<View style={styles.modalButtonsGroup}>
    <ButtonPositionProvider>
        {/* Button to open the Items modal */}
        <DraggableButton id="itemsButton" onPress={() => setItemsModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Items</Text>
            </TouchableOpacity>
        </DraggableButton>

        {/* Button to open the Camera modal */}
        <DraggableButton id="cameraButton" onPress={() => setCameraModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>DigiCam</Text>
            </TouchableOpacity>
        </DraggableButton>

        {/* Button to open the Digimons modal */}
        <DraggableButton id="digimonsButton" onPress={() => setDigimonsModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Digimons</Text>
            </TouchableOpacity>
        </DraggableButton>

        {/* Button to open the Calendar modal */}
        <DraggableButton id="calendarButton" onPress={() => setCalendarMainModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>DigiCalendar</Text>
            </TouchableOpacity>
        </DraggableButton>
        {/* Button to open the OpenAISearch modal */}
        <DraggableButton id="openAISearchButton" onPress={() => setOpenAISearchModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>DigiWeb</Text>
            </TouchableOpacity>
        </DraggableButton>

        {/* Button to open the Photos modal */}
        <DraggableButton id="photosButton" onPress={() => setPhotosModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>DigiAlbum</Text>
            </TouchableOpacity>
        </DraggableButton>
        {/* Button to open the Made My Day modal */}
        <DraggableButton id="jokesButton" onPress={() => setjokesModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>MadeMyDay</Text>
            </TouchableOpacity>
        </DraggableButton>
        {/* Button to open the Settings modal */}
        <DraggableButton id="SettingsButton" onPress={() => setSettingsModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Settings</Text>
            </TouchableOpacity>
        </DraggableButton>
        {/* Button to open the Profile modal */}
        <DraggableButton id="ProfileButton" onPress={() => setProfileModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Profile</Text>
            </TouchableOpacity>
        </DraggableButton>
        {/* Button to open the Calculator modal */}
        <DraggableButton id="CalculatorButton" onPress={() => setCalculatorModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>DigiCalculator</Text>
            </TouchableOpacity>
        </DraggableButton>
        {/* Button to open the Notes modal */}
        <DraggableButton id="NotesButton" onPress={() => setNotesModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>DigiNotes</Text>
            </TouchableOpacity>
        </DraggableButton>
        {/* Button to open the Todo modal */}
        <DraggableButton id="TodoButton" onPress={() => setTodoModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>DigiDo</Text>
            </TouchableOpacity>
        </DraggableButton>
        {/* Button to open the Diary modal */}
        <DraggableButton id="DiaryButton" onPress={() => setDiaryModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>DigiDiary</Text>
            </TouchableOpacity>
        </DraggableButton>
        {/* Button to open the Shop modal */}
        <DraggableButton id="ShopButton" onPress={() => setShopModalVisible(true)}>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>DigiShop</Text>
            </TouchableOpacity>
        </DraggableButton>
    </ButtonPositionProvider>
</View>

           {/* Modal for Items */}
           <Modal
                animationType="slide"
                transparent={true}
                visible={itemsModalVisible}
                onRequestClose={() => setItemsModalVisible(false)} >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Items />
                        <Button title="Close" color="#ffa500" onPress={() => setItemsModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            {/* Modal for Camera */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={cameraModalVisible}
                onRequestClose={() => setCameraModalVisible(false)} >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Camera />
                        <Button title="Close" color="#ffa500" onPress={() => setCameraModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            {/* Modal for Digimons */}
            <Modal
    animationType="slide"
    transparent={true}
    visible={digimonsModalVisible}
    onRequestClose={() => setDigimonsModalVisible(false)}>
    <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Digimons />
            <Button title="Close" color="#ffa500" onPress={() => setDigimonsModalVisible(false)} />
        </View>
    </View>
    </Modal>
          {/* Modal for CalendarMain*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={CalendarMainModalVisible}
            onRequestClose={() => setCalendarMainModalVisible(false)}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <CalendarMain />
                    <Button title="Close" color="#ffa500" onPress={() => setCalendarMainModalVisible(false)} />
                </View>
            </View>
        </Modal>
        
        {/* Modal for Photos*/}
        <Modal
            animationType="slide"
            transparent={true}
            visible={PhotosModalVisible}
            onRequestClose={() => setPhotosModalVisible(false)}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Photos />
                    <Button title="Close" color="#ffa500" onPress={() => setPhotosModalVisible(false)} />
                </View>
            </View>
        </Modal>
            {/* Modal for jokes.API */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={jokesModalVisible}
                onRequestClose={() => {setjokesModalVisible(!jokesModalVisible);}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <JokeComponent />
                        <Button title="Close" color="#ffa500" onPress={() => { setjokesModalVisible(!jokesModalVisible); }} />
                    </View>
                </View>
            </Modal>
            {/* Modal for Settings */}
<Modal
    animationType="slide"
    transparent={true}
    visible={SettingsModalVisible}
    onRequestClose={() => {
        setSettingsModalVisible(!SettingsModalVisible);}}>
    <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Settings />
            <Button title="Close" color="#ffa500" onPress={() => { setSettingsModalVisible(!SettingsModalVisible); }}/>
        </View>
    </View>
</Modal>
{/* Modal for Profile */}
<Modal
                animationType="slide"
                transparent={true}
                visible={ProfileModalVisible}
                onRequestClose={() => {setProfileModalVisible(!ProfileModalVisible);}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Profile />
                        <Button title="Close" color="#ffa500" onPress={() => { setProfileModalVisible(!ProfileModalVisible); }}/>
                    </View>
                </View>
            </Modal>
            {/* Modal for Calculator */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={CalculatorModalVisible}
                onRequestClose={() => {
                    setCalculatorModalVisible(!CalculatorModalVisible);}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Calculator />
                        <Button title="Close" color="#ffa500" onPress={() => { setCalculatorModalVisible(!CalculatorModalVisible);}}/>
                    </View>
                </View>
            </Modal>
            {/* Modal for Notes */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={NotesModalVisible}
                onRequestClose={() => {setNotesModalVisible(!NotesModalVisible);}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Notes />
                        <Button title="Close" color="#ffa500" onPress={() => { setNotesModalVisible(!NotesModalVisible);}}/>
                    </View>
                </View>
            </Modal>
            {/* Modal for Todo */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={TodoModalVisible}
                onRequestClose={() => {setTodoModalVisible(!TodoModalVisible); }} >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Todo />
                        <Button title="Close" color="#ffa500" onPress={() => {setTodoModalVisible(!TodoModalVisible); }}/>
                    </View>
                </View>
            </Modal>
            {/* Modal for Diary */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={DiaryModalVisible}
                onRequestClose={() => {setDiaryModalVisible(!DiaryModalVisible);}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Diary />
                        <Button title="Close" color="#ffa500" onPress={() => {setDiaryModalVisible(!DiaryModalVisible);}}/>
                    </View>
                </View>
            </Modal>
            {/* Modal for Shop */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={ShopModalVisible}
                onRequestClose={() => {setShopModalVisible(!ShopModalVisible);}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Shop />
                        <Button title="Close" color="#ffa500" onPress={() => { setShopModalVisible(!ShopModalVisible);}}/>
                    </View>
                </View>
            </Modal>
            {/* Modal for OpenAISearch */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={OpenAISearchModalVisible}
                onRequestClose={() => {
                    setOpenAISearchModalVisible(!OpenAISearchModalVisible);}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <OpenAISearch />
                        <Button title="Close" color="#ffa500" onPress={() => {setOpenAISearchModalVisible(!OpenAISearchModalVisible);}}/>
                    </View>
                </View>
            </Modal>
            </ItemsProvider>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      marginTop: -120
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalButtonContainer: {
      width: 150, 
      height: 50,
      marginBottom: 5,
  },

  modalButtonsGroup: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%', 
    marginTop: -500, 
    paddingHorizontal: 5, 
},
appButtonContainer: {
    width: 65,
    height: 65,
    backgroundColor:  "#ffa500"/*"rgba(255, 165, 0, 0.9)"*/,
    borderRadius: 10,
    opacity: 0.85, 
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginRight: 10,
},
appButtonText: {
    color: "white",
    fontSize: 12,
    textAlign: "center"
},

});

export default Digivice;
