/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var uiConfig = {
    //githubdominio
        signInSuccessUrl:'https://lrmaldo.github.io/cv/public/',
        //localhost dominio
        //signInSuccessUrl: 'http://localhost:8383/cv/index.html',
        'callbacks': {
      // Called when the user has been successfully signed in.
      'signInSuccess': function(user, credential, redirectUrl) {
        handleSignedInUser(user);
        
// Do not redirect.
        return false;
      }
        },
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
         // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          //firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
         // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            // Invisible reCAPTCHA with image challenge and bottom left badge.
           
            defaultCountry: 'MX', // Set default country to the United Kingdom (+44).
              // For prefilling the national number, set defaultNationNumber.
              // This will only be observed if only phone Auth provider is used since
              // for multiple providers, the NASCAR screen will always render first
              // with a 'sign in with phone number' button.
              defaultNationalNumber: '1234567890',

              loginHint: '+11234567890'
          }
     
          
        ],
        
        // Terms of service url.
        tosUrl: '<your-tos-url>',
                 
      
      
          
       
      };
     



var handleSignedInUser = function(user) {
   
   
  document.getElementById('id_Salir').style.display = 'block';
  document.getElementById('descarga').style.display = 'block';
  
  var storage = firebase.storage();
  
 // var storageRef = storage.ref();
  var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/cv-leo.appspot.com/o/cv_ing_Leonardo.pdf?alt=media&token=d289b2dc-1a1f-44bc-b370-3ea721bc7fbe');
  
  //var gsReference = storage.refFromURL('gs://cv-leo.appspot.com/cv_ing_Leonardo.pdf');
  var img = document.getElementById('descarga');
  img.href = 'https://firebasestorage.googleapis.com/v0/b/cv-leo.appspot.com/o/cv%2Fcv_ing_Leonardo.pdf?alt=media&token=c45f9db8-7e29-4d27-a8fa-908bfc4b59ba';
  img.download ="cv.pdf";
  
//  storageRef.child('cv_ing_Leonardo.pdf').getDownloadURL().then(function(url) {
//  // `url` is the download URL for 'images/stars.jpg'
//
//  // This can be downloaded directly:
//  var xhr = new XMLHttpRequest();
//  xhr.responseType = 'blob';
//  xhr.onload = function(event) {
//    var blob = xhr.response;
//  };
//  xhr.open('GET', url);
//  xhr.send();
//
//  // Or inserted into an <img> element:
//  var img = document.getElementById('descarga');
//  img.download = url;
//}).catch(function(error) {
//  // Handle any errors
//});
  
  $('descarga').each(function() {
  var $a = $(this),
      fileUrl = $a.attr('href');

  $a.attr('href', 'data:application/octet-stream,' + encodeURIComponent(fileUrl));
});
  
console.log("error",user.email);
};




    var handleSignedOutUser = function() {
  document.getElementById('descarga').style.display = 'none';
  document.getElementById('id_Salir').style.display = 'none';
  ui.start('#firebaseui-auth-container', uiConfig);
  console.log("salio usuario");
  };  

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBEEid_WMKWcR8co2z7hDC47RE0hLVoCR4",
    authDomain: "cv-leo.firebaseapp.com",
    databaseURL: "https://cv-leo.firebaseio.com",
    projectId: "cv-leo",
    storageBucket: "cv-leo.appspot.com",
    messagingSenderId: "181262371618"
  };
  firebase.initializeApp(config);
  
var ui = new firebaseui.auth.AuthUI(firebase.auth());


firebase.auth().onAuthStateChanged(function(user) {
  //document.getElementById('loading').style.display = 'none';
  //document.getElementById('loaded').style.display = 'block';
 
  user ? handleSignedInUser(user) : handleSignedOutUser();
  
},function (error){
    var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/account-exists-with-different-credential') {
     document.getElementById('firebaseui-auth-container').style.display='block';
    
  } else {
    alert(errorMessage);
  }
  console.log(error);
});



//////////////////////////////////////////////////////////////////////////////////

 $( document ).ready(function() {
        "use strict";
        
         $("#si_modal").click(function(){
  
  //$('#id_Salir').toggle();
 // $('#firebaseui-auth-container').toggle();   
 document.getElementById('firebaseui-auth-container').style.display='block';
  
});

document.getElementById('id_Salir').addEventListener('click', function() {
    firebase.auth().signOut();
  });


        // NAV
        $('.button-collapse').sideNav({
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
        );
        
        $('.modal').modal();
    /**************************************************************************
            Style demo
    **************************************************************************/
   
    $('.cv-style-switch').click(function(){
        if($(this).hasClass('open')){
            $(this).removeClass('open');
            $('#switch-style').animate({'right':'0'});
        }else{
            $(this).addClass('open');
            $('#switch-style').animate({'right':'-300'});
        }
    });
  
        
         //Portfolio fancybox
        $(".single_imadge").fancybox({
			padding: 4
		});
		
		 //Portfolio 
        $('#portfolio-item').mixItUp();
        
        // Sticky nav
        $("#sticky-nav").sticky({topSpacing:0});
        
        //Skills
        $(".determinate").each(function(){
            var width = $(this).text();
            $(this).css("width", width)
                .empty()
                .append('<i class="fa fa-circle"></i>');                
        });
        
    // Nav
        
   $('#example-one').onePageNav({
      changeHash: true,
      scrollSpeed: 750,
      scrollThreshold: 0.5,
     filter: ':not(.external)'
   });
        
    $('a[href^="#"].inpage-scroll, .inpage-scroll a[href^="#"]').on('click', function(e) {
       e.preventDefault();

        var target = this.hash,
           $target = $(target);
       $('.main-navigation a[href="' + target + '"]').addClass('active');
       $('.main-navigation a:not([href="' + target + '"])').removeClass('active');
        $('html, body').stop().animate({
            'scrollTop': ($target.offset()) ? $target.offset().top : 0
       }, 900, 'swing', function() {
           window.location.hash = target;
        });
    });
    
            
    //Conatct
     
        // Blog
        jQuery(window).on('load', function(){ var $ = jQuery;
            $('.blog').masonry({
                itemSelector: '.blog-post',
                columnWidth: '.blog-post',
                percentPosition: true
            });
        });
        
        // Contact form
        
        $("#contactForm").validator().on("submit", function (event) {
            if (event.isDefaultPrevented()) {
              // handle the invalid form...
              formError();
              submitMSG(false, "Did you fill in the form properly?");
            } else {
              // everything looks good!
              event.preventDefault();
              submitForm();
            }
         });


        function submitForm(){
            var database = firebase.database();
          // Initiate Variables With Form Content
         
          var name = $("#name").val();
          var email = $("#email").val();
          var message = $("#message").val();
          var aleatorio = Math.round(Math.random()*10000);
          firebase.database().ref('contacto/'+aleatorio+'-c/').set({
            name: name,
            email: email,
            message : message
          });
          $("#contactForm")[0].reset();
           var $toastContent = $('<span>Mensaje Enviado!!</span>');
             Materialize.toast($toastContent, 5000,'rounded');
    
//          $.ajax({
//              type: "POST",
//              url: "process.php",
//              data: "name=" + name + "&email=" + email + "&message=" + message,
//              success : function(text){
//                  if (text == "success"){
//                      formSuccess();
//                    } else {
//                      formError();
//                      submitMSG(false,text);
//                    }
//                }
//            });
        }
        function formSuccess(){
            $("#contactForm")[0].reset();
            submitMSG(true, "Message Sent!")
        }
        function formError(){
            $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
            function(){
              $(this).removeClass();
            });
        }
        function submitMSG(valid, msg){
            if(valid){
              var msgClasses = "h3 text-center fadeInUp animated text-success";
            } else {
              var msgClasses = "h3 text-center text-danger";
            }
            $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
        }
        
        //Tooltip
        $('.tooltipped').tooltip({delay: 50});
        
        //wow
        new WOW().init();
        
    });
    
    jQuery(document).ready(function($) {
        
        $('.sa-view-project-detail').on('click', function(event) {
            event.preventDefault();
            var href          = $(this).attr('href') + ' ' + $(this).attr('data-action'),
                dataShow      = $('#project-gallery-view'),
                dataShowMeta  = $('#project-gallery-view meta'),
                dataHide      = $('#portfolio-item'),
                preLoader     = $('#loader'),
                backBtn       = $('#back-button'),
                filterBtn     = $('#filter-button');

            dataHide.animate( { 'marginLeft':'-120%' }, { duration: 400, queue: false } );
            filterBtn.animate( { 'marginLeft':'-120%' }, { duration: 400, queue: false } );
            dataHide.fadeOut(400);
            filterBtn.fadeOut(400);
            setTimeout( function() { preLoader.show(); }, 400);
            setTimeout( function() {
                dataShow.load( href, function() {
                    dataShowMeta.remove();
                    preLoader.hide();
                    dataShow.fadeIn(600);
                    backBtn.fadeIn(600);
                });
            },800);
        });

        $('#back-button').on('click', function(event) {
            event.preventDefault();
            var dataShow    = $('#portfolio-item'),
                dataHide    = $('#project-gallery-view'),
                filterBtn   = $('#filter-button');

            $("[data-animate]").each( function() {
                $(this).addClass($(this).attr('data-animate'));
            });

            dataHide.fadeOut(400);
            $(this).fadeOut(400);
            setTimeout(function(){
                dataShow.animate( { 'marginLeft': '0' }, { duration: 400, queue: false } );
                filterBtn.animate( { 'marginLeft': '0' }, { duration: 400, queue: false } );
                dataShow.fadeIn(400);
                filterBtn.fadeIn(400);
            },400);
            setTimeout(function(){
                dataShow.find('.fadeInRight, .fadeInLeft, .fadeInUp, .fadeInDown').removeClass('fadeInRight').removeClass('fadeInLeft').removeClass('fadeInUp').removeClass('fadeInDown');
            },1500);
        });
    });
    
    function printDiv(nombreDiv) {
     var contenido= document.getElementById(nombreDiv).innerHTML;
     var contenidoOriginal= document.body.innerHTML;

     document.body.innerHTML = contenido;

     window.print();

     document.body.innerHTML = contenidoOriginal;
}