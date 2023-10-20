import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    padding: 50,
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#663399',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    borderColor: '#663399',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#663399',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  task: {
    maxWidth: '80%',
    color: '#663399',
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});