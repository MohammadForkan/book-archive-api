document.getElementById('spinner').style.display = 'none';
document.getElementById('error-message').style.display = 'none';

///Book load
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear data
    searchField.value = '';

    //Handle Empty input
    if (searchText == "") {
        //error hadle
        displayError();
    }
    else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        //Hide previous result
        document.getElementById('search-result').textContent = '';
        // Hide books number
        document.getElementById('team-numbers').textContent = '';
        //Hide Error Message
        document.getElementById('error-message').style.display = 'none';

        //Fetch Book info
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }


}

///Display Error
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('team-numbers').textContent = '';

}

// Display Search Result
const displaySearchResult = info => {
    //Hide spinner
    document.getElementById('spinner').style.display = 'none';
    //Hide Books Empty
    document.getElementById('team-numbers').innerText = "";
    ////Searching book
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    //All Info Diplay
    const allInfo = info.docs;
    console.log(allInfo);

    //Hdable Empty error
    if (allInfo == null) {
        //Error
        displayError();
    }
    else {
        //Hide error message
        document.getElementById('error-message').innerText = '';
        ////hide spinner
        document.getElementById('spinner').style.display = 'none';
        //Show books found
        document.getElementById('team-numbers').innerText = `Books Found ${info.numFound}`;


        allInfo.forEach(book => {
            console.log(book);
            const imgUrl = ` https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
     <div  class="card h-100 text-center">
         <img src="${imgUrl ? imgUrl : 'N/A'}" class="w-50 h-50 mx-auto" alt="...">
         <div class="card-body">
             <h5 class="card-title">Name: ${book.title}</h5>
             <p class="card-text">Author: ${book.author_name ? book.author_name : ''}</p>
             <p class="card-text">Publisher: ${book.publisher}</p>
             <p class="card-text">First Published: ${book.first_publish_year ? book.first_publish_year : ''}</p>
             <p class="card-text">Publish: ${book.publish_date}</p>
         </div>
         <div class = "card-footer">
             <button class="btn btn-outline-dark" onclick="loadTeamDetail()">Load More <i class="fas fa-arrow-right"></i></button> 
         </div>
     </div>
     `;
            searchResult.appendChild(div);
        });
    }

}
