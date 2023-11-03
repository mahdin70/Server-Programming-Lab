const fs = require('fs');

fs.readFile("./contents/demofile.txt", "utf-8", (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Before : ");
        console.log(data);
    }
});

fs.writeFile(
    "./contents/demofile.txt",
    "We are learning Node.js \n",
    (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Write Successful");
        }
    }
);


fs.appendFile(
    "./contents/demofile.txt",
    "Forrest Gump Appended",
    (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Append Successful");
        }
    }
);

fs.readFile("./contents/demofile.txt", "utf-8", (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log("After : ");
        console.log(data);
    }
});