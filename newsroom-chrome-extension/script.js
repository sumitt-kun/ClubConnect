document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch(
      "https://clubconnect.onrender.com/api/v1/news/getNews"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message);
    console.log(data.message[0].name);
    console.log(data.message[0].date);
    console.log(data.message[0].eventDate);
    console.log(data.message[0].link);
    console.log(data.message[0].poster);
    if (Array.isArray(data.message)) {
      const newsContainer = document.getElementById("newsContainer");

      data.message.forEach((news) => {
        const newsElement = document.createElement("div");
        newsElement.classList.add("news-item");
        const imgElement = document.createElement("img");
        imgElement.src = news.poster;
        imgElement.alt = news.name;
        newsElement.appendChild(imgElement);
        const nameElement = document.createElement("h3");
        nameElement.textContent = news.name;
        newsElement.appendChild(nameElement);

        const dateElement = document.createElement("p");
        dateElement.textContent = `Date: ${news.date}`;
        newsElement.appendChild(dateElement);

        const eventDateElement = document.createElement("p");
        eventDateElement.textContent = `Event Date: ${news.eventDate}`;
        newsElement.appendChild(eventDateElement);

        newsContainer.appendChild(newsElement);
      });
    } else {
      throw new Error("Data received is not in expected format");
    }
  } catch (error) {
    console.error("Error fetching news:", error.message);
  }
});
