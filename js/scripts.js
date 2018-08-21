var contactArray = [];

// business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}
function Address(type, street, city, state, zip) {
  this.type = type;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
  console.log(type);
}

  Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
  }
  Address.prototype.fullAddress = function() {
    return "<h3>" + this.type + "</h3>" + this.street + ", " + this.city + ", " + this.state + " " + this.zip;
  }
// user interface logic
function resetFields() {
  $("input[type=radio][name=exampleRadios]:checked").val("");
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
  $("input.new-zip").val("");
}

$(document).ready(function() {

  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                  '<div class="address-type">' +
                                    '<div class="form-check">' +
                                      '<input class="form-check-input" type="radio" name="exampleRadios2" id="home" value="home" checked>' +
                                      '<label class="form-check-label" for="home">' +
                                        'Home' +
                                      '</label>' +
                                    '</div>' +
                                    '<div class="form-check">' +
                                      '<input class="form-check-input" type="radio" name="exampleRadios2" id="work" value="work">' +
                                      '<label class="form-check-label" for="work">' +
                                        'Work' +
                                      '</label>' +
                                    '</div>' +
                                    '<div class="form-check">' +
                                      '<input class="form-check-input" type="radio" name="exampleRadios2" id="school" value="school">' +
                                      '<label class="form-check-label" for="school">' +
                                        'School' +
                                      '</label>' +
                                    '</div>' +
                                  '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-zip">Zip</label>' +
                                   '<input type="text" class="form-control new-zip">' +
                                 '</div>' +
                               '</div>');
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);
    contactArray.push(newContact);

    $(".new-address").each(function() {
      var inputtedAddressType = $(this).find("input[type=radio][name=exampleRadios2]:checked").val();
      console.log(inputtedAddressType);
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedZip = $(this).find("input.new-zip").val();
      var newAddress = new Address(inputtedAddressType, inputtedStreet, inputtedCity, inputtedState, inputtedZip)
      newContact.addresses.push(newAddress)

    });


    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
    resetFields()
  });
});
