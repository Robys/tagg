

export const CheckAddContact = (person,currentUser) =>{
            const contacts = currentUser.contacts
            console.log(contacts)
                if(contacts[0] !== null){
                    contacts.filter(contact => {
                      if(contact.id === person){
                        return false
                      }
      
                    })
                }
                else {
                    return true
                }
}