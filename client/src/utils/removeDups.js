export default function removeDups(names) {
    let unique = {};
    for(var i = 0; i < names.lenght; i++){
      if(!unique[i]) {
        unique[i] = true;
      }
    }
    return Object.keys(unique);
  }
  