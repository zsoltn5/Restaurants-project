document.forms['Kitoltheto form'].elements.email.placeholder = 'test@example.com';
document.forms['Kitoltheto form'].elements.form_keresztnev.placeholder = 'Example';
document.forms['Kitoltheto form'].elements.form_vezeteknev.placeholder = 'Example';
document.forms['Kitoltheto form'].elements.form_weboldal.placeholder = 'http:// www.example.com';
document.getElementById('form_submit').disabled = true;
document.getElementById('f_footer').innerHTML = `Last Modified: ${document.lastModified}`;

document.getElementById('email_').style.display = 'none';
document.getElementById('url_').style.display = 'none';
var okemail = 0, okurl = 0;

function checkemail(email) {
  const regex = /[a-z0-9]+@(yahoo|gmail).com/;

  if ((!regex.test(email)) || document.forms['Kitoltheto form'].elements.form_email.validity.valid != true) {
    document.getElementById('email_').style.display = 'block';
    okemail = 0;
  } else {
    okemail = 1;
    document.getElementById('email_').style.display = 'none';
  }
  valid();
}

function checkurl(url) {
  const regex = /[a-z A-Z 0-9 \- _]*\..*/;

  if (!regex.test(url) || document.forms['Kitoltheto form'].elements.form_weboldal.validity.valid != true) {
    document.getElementById('url_').style.display = 'block';
    okurl = 0;
  } else {
    okurl = 1;
    document.getElementById('url_').style.display = 'none';
  }
  valid();
}

function isEmpty(valtozo){
  return (valtozo === undefined || valtozo == null || valtozo.length <= 0) ? true : false;
}

function valid(){
  const vezeteknev = document.getElementById('form_vezeteknev').value;
  const keresztnev = document.getElementById('form_keresztnev').value;
  const date = document.getElementById('form_date').value;
  document.getElementById('f_footer').innerHTML = `Last Modified: ${form_vezeteknev.checkValidity()}`;

  if((okemail == 1) && (okurl == 1) && (form_vezeteknev.checkValidity()) && (form_keresztnev.checkValidity()) && (!isEmpty(date))){
    document.getElementById('form_submit').disabled = false;
  } else {
    document.getElementById('form_submit').disabled = true;
  }
}