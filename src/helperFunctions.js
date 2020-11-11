const findFolder = function(folders, folderId) {
  return folders.find(folder => folder.id === folderId);
}

const findNote = function(notes, noteId) {
  return notes.find(note => note.id === noteId);
}

const getNotesForFolder = function(notes, folderId) {
  return (!folderId) ? notes : notes.filter(note => note.folderId === folderId)
}

const countNotesForFolder = function(notes, folderId) {
  return notes.filter(note => note.folderId === folderId).length
}

export {
  findFolder,
  findNote,
  getNotesForFolder,
  countNotesForFolder
}