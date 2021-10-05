$(document).ready(function () 
{
    console.log("running");
    let myKey = "CCz3E5faz78XD7S4mi6Tm5FX78jDyKhG";

    //Result of GIFs
    let giphy_result = 50;

    let url = "http://api.giphy.com/v1/gifs/search";
    let searchWord = "";


    $("#giphy_btn-search").click(function () 
    {
        searchWord = $("#searchInputText").val();
        let userSearch = url + "?" + "q=" + searchWord + "&" + "api_key=" + myKey + "&" + "limit=" + giphy_result;
        console.log(userSearch);

        $.get(userSearch, function (response) 
        {
            console.log(response);  
            $("#imageResults").empty();  //empty

            response.data.forEach(function (element) 
            {
                $('#imageResults').append(
                    '<link rel="stylesheet" href="Rating_Assignment.css">' +

                    '<div class="card" style="width: 18rem;">' +
                        '<img class="card-img-top" src=' + element.images.downsized.url + ' alt="Card image cap">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title">' + element.title + '</h5>' +
                            '<a href="' + element.images.downsized.url + '" class="btn btn-primary">View</a>' +
                            '<br></br>' +
                            '<div class="rating_system">' +

                                //Rating Assignment
                                '<h3>Rate Us</h3>' +
                                '<div id="rating-container">'+
                                    '<div class="rating-circle"></div>' +
                                    '<div class="rating-circle"></div>' +
                                    '<div class="rating-circle"></div>' +
                                    '<div class="rating-circle"></div>' +
                                    '<div class="rating-circle"></div>' +
                                '</div>' +

                                '<div class="row my-4">' +
                                    '<div class="col">' +
                                        '<button class="btn btn-outline-secondary" onclick="submit();">Submit</button>' +
                                        '&nbsp' +
                                        '&nbsp' +
                                        '<button class="btn btn-outline-secondary" onclick="reset();">Reset</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
        
                    '<script>' +
                        'let allCircles;' +    //A global variable that counts the div elements in the rating-circle class
                        'let selection = 0;' + //Stores the value of rating selection

                        '$(document).ready(function()' +
                        '{' +
                            'allCircles = $(".rating-circle").length;' +
                            'message(0, allCircles); ' +

                            //Gives you the total value of circles in the rating-circle class
                            'console.log(`The total value of the circles is: ${allCircles}`);' +

                            'hoverCircle();' + //Function when Mouse hovers over the circle
                            'clickCircle();' + //Function when Mouse clicks on a circle
                        '});' +


                        'function hoverCircle()' +
                        '{' +
                            '$(".rating-circle").hover(function()' +
                            '{' +
                                //Removes the classes
                                'ClickClass_Remove();' +
                                'HoverClass_Remove();' +


                                //Adds the hover class
                                'HoverClass_Add(this)' +
                            '},' +

                                'function()' +
                                '{' +
                                    '$(".rating-circle").removeClass("rating-hover");' +
                                    
                                    'if ($("rating-container").mouseleave())' +
                                    '{' +
                                        '$("#rating-container").mouseleave(Circle_Fill(selection));' +
                                    '}' +
                                '});  ' +
                        '}' +


                        //Function to click on any circle and display the green background color               
                        'function clickCircle()' +
                        '{' +
                            '$(".rating-circle").click(function()' +
                            '{' +
                                //Removes the click class
                                'ClickClass_Remove();' +

                                //Adds the new click class
                                'ClickClass_Add(this);' +   

                                'selection = $(".rating-chosen").length;' +
                                'console.log(`Selection: ${selection}`);' +
                                'message(selection, allCircles);' +
                            '});' +
                        '}' +


                        //Fills the rating circle without clicking on it (Which is yellow)
                        'function Circle_Fill(rate)' +
                        '{' +
                            'console.log(`Rating: ${rate}`);' +
                            'for(let i = 0; i < rate; i++)' +
                            '{' +
                                '$(".rating-circle").eq(i).addClass("rating-chosen");' +
                            '}' +
                        '}' +


                        //The message you want to display
                        'function message(rate, t)' +
                        '{' +
                            'let m = "";' +
                            'if(rate)' +
                            '{' +
                                'm = "You Selected " +rate +" - Thank You";' +
                            '}' +
                            'else' +
                            '{' +
                                'm = "Please select a rating from 1 to " +t;' +
                            '}' +

                            'return print(m);' +
                        '}' +

                            
                        //Prints the message after you choose a rating from 1 to 5
                        'function print(m)' +
                        '{' +
                            '$("#messageDialog").text(m);' +
                        '}' +


                        'function ClassRemove()' +
                        '{' +
                            '$(".rating-circle").removeClass("rating-hover");' +
                            '$(".rating-circle").removeClass("rating-chosen");' +
                       '}' +   


                        //Adds the class used when clicking on a rating circle
                        'function ClickClass_Add(that)' + 
                        '{' +
                            '$(that).addClass("rating-chosen");' +
                            '$(that).prevAll().addClass("rating-chosen");' +
                        '}' +

                        //Removes the class used when clicking on a rating circle
                        'function ClickClass_Remove()' + 
                        '{' + 
                            'if ($(".rating-chosen").length)' +  
                            '{' + 
                                '$(".rating-circle").removeClass("rating-chosen");' + 
                            '}' + 
                        '}' + 


                        //Adds the class used when hovering on a rating circle
                        'function HoverClass_Add(that)' +  
                        '{' + 
                            '$(that).addClass("rating-hover");' + 
                            '$(that).prevAll().addClass("rating-hover");' + 
                        '}' + 

                        //Removes the class used when hovering on a rating circle
                        'function HoverClass_Remove()' +  
                        '{' + 
                            'if ($(".rating-hover").length)' +  
                            '{' + 
                                '$(".rating-circle").removeClass("rating-hover");' + 
                            '}' + 
                        '}' + 


                        //Function used to reset the rating after intially selecting another rating
                        'function reset()' +  
                        '{' + 
                            'selection = 0;' + 
                            'ClassRemove();' + 
                            'message(0, allCircles);' + 
                        '}' + 


                        //Submits the form
                        'function submit()' +  
                        '{' + 
                            'console.log(`Submitted`);' + 
                        '}' + 
                    '</script>'
                )
            })
        })
    })



    $("#giphy_image").click(function MainFunction()
    {
        window.location.href="GIPHY_Project.html";
    })
   
    $("#giphy_btn-about").click(function AboutUsFunction()
    {
        window.location.href="AboutPage.html";
    })

    $("#giphy_btn-contact").click(function ContactFunction()
    {
        window.location.href="ContactUsPage.html";
    })

    $("#giphy_btn-faq").click(function ContactFunction()
    {
        window.location.href="FAQPage.html";
    })




    $("#searchInputText").keyup(function (event) 
    {
        if (event.which === 13) {
            $("#giphy_btn-search").click();
        }
    });

    $("#giphy_btn-search").click(function Count()
    {
        $("#count").val(giphy_result);
    })



    var faq = document.getElementsByClassName("faq-page");
    var i;
    for (i = 0; i < faq.length; i++) 
    {
        faq[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");
            /* Toggle between hiding and showing the active panel */
            var body = this.nextElementSibling;
            if (body.style.display === "block") {
                body.style.display = "none";
            } else {
                body.style.display = "block";
            }
        });
    }


});



