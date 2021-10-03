
 import jsPDF from "jspdf";
 import "jspdf-autotable";
 
 const config = {
     unit : "pt",
     size : "A4",// Use A1, A2, A3 or A4
     orientation: "portrait" // portrait or landscape
 }

 /**
 * Export the list (in PDF format) of all users
 * 
 * @param {Object} list - list of users
 */

  const ExportUserPDF = (list) => {
 
     const marginLeft = 40;
     const doc = new jsPDF(config);
 
     doc.setFontSize(15);
 
     const title = "Lista de usuários";
     const headers = [["ID", "NOME", "SOBRENOME" ,"EMAIL","LOCAL","TIPO"]];
 
     const data = list.map(user=> [user.id,user.firstName,user.lastName,user.email,user.location,user.roles]);
 
     let content = {
       startY: 50,
       head: headers,
       body: data
     };
 
     doc.text(title, marginLeft, 40);
     doc.autoTable(content);
     doc.save("lista-de-usuários.pdf")
   }

    /**
 * Export the list (in PDF format) of all games
 * 
 * @param {Object} list - list of games
 */
 
   const ExportGamesPDF = (list) => {
 
     const marginLeft = 40;
     const doc = new jsPDF(config);
 
     doc.setFontSize(15);
 
     const title = "Lista de jogos adicionados";
     const headers = [["ID", "TITULO", "CONSOLE" ,"LOCAL","STATUS"]];
 
     const data = Object.values(list).map(game=> [game.id,game.title,game.platform,game.location,game.status]);
 
     let content = {
       startY: 50,
       head: headers,
       body: data
     };
 
     doc.text(title, marginLeft, 40);
     doc.autoTable(content);
     doc.save("lista-de-jogos.pdf")
   }

    /**
 * Export the list (in PDF format) of all requests
 * 
 * @param {Object} list - list of requests
 */
 
   const ExportRequestPDF = (list) => {

     const marginLeft = 40;
     const doc = new jsPDF(config);
 
     doc.setFontSize(12);
 
     const title = "Lista de jogos adicionados";
     const headers = [["ID","REQUISITADO","SELECIONADO","CRIAÇÃO","ANDAMENTO"]];
 
     const data = Object.values(list).map(item => 
     [item.id,item.requested.title,item.selected.title, item.createdAt, item.status]);
     
 
     let content = {
       startY: 50,
       head: headers,
       body: data
     };
 
     doc.text(title, marginLeft, 40);
     doc.autoTable(content);
     doc.save("lista-de-trocas.pdf")
   }

   export {ExportGamesPDF,ExportUserPDF,ExportRequestPDF}