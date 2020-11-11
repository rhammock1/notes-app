const findFolder = function(folders, folderId) {
  return folders.find(folder => folder.id === folderId);
}

const findNote = function(notes, noteId) {
  return notes.find(note => note.id === noteId);
}

const getNotesForFolder = function(notes, folderId) {
  return (!folderId) ? notes : notes.filter(note => note.folderId === folderId)
}

export default {
  findFolder,
  findNote,
  getNotesForFolder,
}