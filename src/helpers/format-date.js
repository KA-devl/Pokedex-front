const formatDate = (date) =>{
  
  return `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`;

}

export default formatDate;