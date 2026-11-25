
// COURSE DATABASE

const courses = [
    {
        id: 1,
        name: "Full Stack Web Development",
        category: "Programming",
        instructor: "John Smith",
        level: "Beginner",
        duration: 40,
        price: 2499,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description: "Learn HTML, CSS, JavaScript, React and backend development."
    },
    {
        id: 2,
        name: "Python Programming",
        category: "Programming",
        instructor: "David Miller",
        level: "Beginner",
        duration: 30,
        price: 1999,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        description: "Master Python programming from basic to advanced concepts."
    },
    {
        id: 3,
        name: "UI UX Design Masterclass",
        category: "Design",
        instructor: "Sarah Wilson",
        level: "Intermediate",
        duration: 25,
        price: 1799,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
        description: "Learn user interface and user experience design."
    },
    {
        id: 4,
        name: "Digital Marketing",
        category: "Marketing",
        instructor: "Robert James",
        level: "Beginner",
        duration: 20,
        price: 1499,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        description: "Learn SEO, social media and online advertising."
    },
    {
        id: 5,
        name: "Data Science with Python",
        category: "Data Science",
        instructor: "Emily Brown",
        level: "Advanced",
        duration: 50,
        price: 3999,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        description: "Explore data analytics, machine learning and visualization."
    },
    {
        id: 6,
        name: "Business Management",
        category: "Business",
        instructor: "Michael Scott",
        level: "Intermediate",
        duration: 35,
        price: 2299,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
        description: "Develop leadership and business management skills."
    },
    {
        id: 7,
        name: "Advanced JavaScript",
        category: "Programming",
        instructor: "Alex Johnson",
        level: "Advanced",
        duration: 45,
        price: 2999,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        description: "Explore advanced JavaScript and modern web development."
    },
    {
        id: 8,
        name: "Graphic Design",
        category: "Design",
        instructor: "Lisa Taylor",
        level: "Beginner",
        duration: 18,
        price: 1299,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd",
        description: "Learn professional graphic design fundamentals."
    },
    {
        id: 9,
        name: "Machine Learning",
        category: "Data Science",
        instructor: "Daniel White",
        level: "Advanced",
        duration: 60,
        price: 4499,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc",
        description: "Understand machine learning algorithms and applications."
    }
];

let filteredCourses = [...courses];
let displayedCount = 6;

let wishlist = [];

// DOM ELEMENTS

const courseGrid = document.getElementById("courseGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const courseCount = document.getElementById("courseCount");
const loadMore = document.getElementById("loadMore");

// DISPLAY COURSES

function displayCourses() {

    courseGrid.innerHTML = "";

    const visibleCourses =
        filteredCourses.slice(0, displayedCount);

    courseCount.innerText =
        `Showing ${visibleCourses.length} of ${filteredCourses.length} courses`;

    if (visibleCourses.length === 0) {
        courseGrid.innerHTML =
            "<p>No courses found. Try changing your filters.</p>";
    }

    visibleCourses.forEach(course => {

        const card = document.createElement("div");

        card.className = "course-card";

        card.innerHTML = `
            <img src="${course.image}" alt="${course.name}">

            <div class="course-info">

                <h3>${course.name}</h3>

                <p>Instructor: ${course.instructor}</p>

                <div class="course-meta">
                    <span>⭐ ${course.rating}</span>
                    <span>${course.duration} Hours</span>
                </div>

                <p>${course.category} | ${course.level}</p>

                <div class="price">₹${course.price}</div>

                <div class="course-actions">

                    <button class="details-btn"
                        onclick="showDetails(${course.id})">
                        View Details
                    </button>

                    <button class="wishlist-btn"
                        onclick="toggleWishlist(${course.id})">
                        ${wishlist.includes(course.id) ? "♥" : "♡"}
                    </button>

                </div>

            </div>
        `;

        courseGrid.appendChild(card);

    });

    loadMore.style.display =
        displayedCount >= filteredCourses.length
            ? "none"
            : "block";
}

// FILTER AND SEARCH

function applyFilters() {

    const search = searchInput.value.toLowerCase();

    const selectedCategories = [
        ...document.querySelectorAll(".categoryFilter:checked")
    ].map(item => item.value);

    const selectedLevels = [
        ...document.querySelectorAll(".levelFilter:checked")
    ].map(item => item.value);

    const maxPrice = Number(priceRange.value);

    filteredCourses = courses.filter(course => {

        const matchesSearch =
            course.name.toLowerCase().includes(search) ||
            course.instructor.toLowerCase().includes(search) ||
            course.category.toLowerCase().includes(search);

        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(course.category);

        const matchesLevel =
            selectedLevels.length === 0 ||
            selectedLevels.includes(course.level);

        const matchesPrice = course.price <= maxPrice;

        return matchesSearch &&
            matchesCategory &&
            matchesLevel &&
            matchesPrice;

    });

    sortCourses();

}

// CATEGORY BUTTON FILTER

function filterCategory(category) {

    document.querySelectorAll(".categoryFilter")
        .forEach(item => {
            item.checked =
                category !== "All" &&
                item.value === category;
        });

    applyFilters();

    document.getElementById("catalogue")
        .scrollIntoView({ behavior: "smooth" });
}

// SORTING

function sortCourses() {

    const sortType = sortSelect.value;

    if (sortType === "priceLow") {
        filteredCourses.sort((a, b) => a.price - b.price);
    }

    else if (sortType === "priceHigh") {
        filteredCourses.sort((a, b) => b.price - a.price);
    }

    else if (sortType === "rating") {
        filteredCourses.sort((a, b) => b.rating - a.rating);
    }

    else if (sortType === "name") {
        filteredCourses.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    else if (sortType === "duration") {
        filteredCourses.sort((a, b) =>
            a.duration - b.duration
        );
    }

    else {
        filteredCourses = filteredCourses.sort(
            (a, b) => a.id - b.id
        );
    }

    displayedCount = 6;

    displayCourses();
}

// COURSE DETAILS

function showDetails(id) {

    const course = courses.find(item => item.id === id);

    alert(
        "COURSE DETAILS\n\n" +
        "Course: " + course.name + "\n" +
        "Instructor: " + course.instructor + "\n" +
        "Category: " + course.category + "\n" +
        "Level: " + course.level + "\n" +
        "Duration: " + course.duration + " Hours\n" +
        "Rating: " + course.rating + "\n" +
        "Price: ₹" + course.price + "\n\n" +
        course.description
    );
}

// WISHLIST

function toggleWishlist(id) {

    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    }

    else {
        wishlist.push(id);
    }

    displayCourses();
}

// RESET FILTERS

function resetFilters() {

    searchInput.value = "";
    sortSelect.value = "default";
    priceRange.value = 5000;
    priceValue.innerText = "5000";

    document.querySelectorAll(
        ".categoryFilter, .levelFilter"
    ).forEach(item => {
        item.checked = false;
    });

    applyFilters();
}

// LOAD MORE

loadMore.addEventListener("click", () => {

    displayedCount += 3;

    displayCourses();

});

// EVENT LISTENERS

searchInput.addEventListener("input", applyFilters);

sortSelect.addEventListener("change", applyFilters);

priceRange.addEventListener("input", () => {

    priceValue.innerText = priceRange.value;

    applyFilters();

});

document.querySelectorAll(
    ".categoryFilter, .levelFilter"
).forEach(item => {

    item.addEventListener("change", applyFilters);

});

// INITIAL DISPLAY

displayCourses();
