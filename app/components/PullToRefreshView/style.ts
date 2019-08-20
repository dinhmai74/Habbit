import { StyleSheet } from "react-native";

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: 150,
  },

  scrollView: {
    flex: 1,
  },
  fillParent: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  topBar: {
    backgroundColor: '#F7F7F8',
    height: 64,
  },
  row: {
    padding: 10,
    height: 125,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    marginBottom: -1,
    borderBottomColor: '#E5EDF5',
    borderTopColor: '#E5EDF5',
    borderBottomWidth: 1,
  },
  text: {
    textAlign: 'center',
    color: '#A4C8D9',
  },
  navText: {
    color: '#A4C8D9',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 30,
  },
})
