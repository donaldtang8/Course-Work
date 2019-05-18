//Donald Tang
//Pledge: I pledge my honor I have abided by the Stevens Honor System.

module.exports = {

     volumeOfRectangularPrism: function (length, width, height) {
        //This method will calculate the volume of a rectangular prism. You must check that each argument is provided, is a number, and is within proper bounds
        if (length === undefined || typeof length !== "number") {
            throw "Length is not a number";
        }

        if (width === undefined || typeof width !== "number") {
            throw "Width is not a number";
        }

        if (height === undefined || typeof height !== "number") {
            throw "Height is not a number";
        }

        if (length <= 0 || width <= 0 || height <= 0) {
            throw "Length, width, and height need to be greater than zero."
        }
        return length * width * height;
    },

    surfaceAreaOfRectangularPrism: function (length, width, height) {
        //This method will calculate the surface area of a rectangular prism. You must check that each argument is provided, is a number, and is within proper bounds.
        if (length === undefined || typeof length !== "number") {
            throw "Length is not a number";
        }

        if (width === undefined || typeof width !== "number") {
            throw "Width is not a number";
        }

        if (height === undefined || typeof height !== "number") {
            throw "Height is not a number";
        }

        if (length <= 0 || width <= 0 || height <= 0) {
            throw "Length, width, and height need to be greater than zero."
        }

        return 2 * ((length * width) + (length * height) + (width * height));
    },

    volumeOfSphere: function (radius) {
        //This method will calculate the volume of a sphere. You must check that each argument is provided, is a number, and is within proper bounds. You must use Math.PI as the pi value.
        if (radius === undefined || typeof radius !== "number") {
            throw "Radius is not a number";
        }

        if (radius <= 0) {
            throw "Radius needs to be greater than zero"
        }

        return ((4 / 3) * (Math.PI) * (Math.pow(radius, 3)));
    },

    surfaceAreaOfSphere: function(radius) {
        //This method will calculate the surface area of a sphere. You must check that each argument is provided, is a number, and is within proper bounds. You must use Math.PI as the pi value.
        if (radius === undefined || typeof radius !== "number") {
            throw "Radius is not a number";
        }

        if (radius <= 0) {
            throw "Radius needs to be greater than zero"
        }

        return (4 * Math.PI * (radius * radius));
    }
}