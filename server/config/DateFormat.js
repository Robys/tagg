const DateFormat = () => {

    return new Date().toLocaleDateString('pt-br', { dateStyle: 'short'} )
 }
 
 module.exports = DateFormat