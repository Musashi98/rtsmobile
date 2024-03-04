# RTS-MOBILE

RTS-MOBILE is a sample application to apply mobile development and Firebase integration knowledge. Below, I will discuss how I developed the project and what I was thinking and doing step by step.

## Usage

Clone the repository and and use 'npm install' or 'yarn install' to install the dependencies. To run the project you can simply use the command 'npx expo start' and load the url from the Expo Go application.

## Events

Events should be created from an administrator app, or later an admin module could be added to this project. For now, there are 3 mock example events, whose codes are 4SP54Y01, 6JB14R02 and 8RA19B03. The first two events are active, and the third one is inactive.

## Development Process

- **Understanding Requirements**: The first step was to read the requirements to plan and estimate how much time it would take to complete the project. Due to time constraints (working nights/early mornings and being in the middle of moving), I estimated that it could be finished in about a week or a little more.

- **Project Planning**: I started by planning the project, thinking about the screens and functionalities that needed to be implemented, and then installing the necessary libraries such as Firebase, Zustand, Tamagui, AsyncStorage, etc.

- **Authentication**: The first functionality implemented was user authentication. I focused on functionality rather than appearance at first, adding fields for user information and links for navigation between login and registration screens. Firebase integration was straightforward, handling different errors and creating a Firestore collection to store user data.

- **Event Search and Creation**: Implemented a screen to search for an event by code, and other to create events from the application. The event creation screen is hidden from the user and was only created with the idea that in the future, an admin module could be developed to create events. Saved event information in Zustand store and AsyncStorage for future sessions.

- **Home Screen**: Developed a screen to display event information, and added two buttons to go view selfies taken at the event, and to take a new selfie. Created a component (BackgroundView) to display the event photo as the background with a slight layer of darkness.

- **Selfie List**: Implemented a screen to display event selfies using a FlatList for efficiency. Calculated the number of columns dynamically for responsive layout. Tested it with mock images.

- **Selfie Camera**: Added functionality to take selfies using the front camera. Utilized Expo Camera and Expo Image Manipulator to capture and invert the result image. Uploaded photos to Firebase Storage with unique names based on user's uid and current date and time, and added them to the user's list of selfies for the current event.

## Extra work

- **Design Enhancements**: Reviewed and improved the application's design for a more pleasant user experience, like background imaging, own custom modals for dialogs, icons representing buttons actions, etc. Also, fixed navigation bugs to ensure smooth navigation throughout the app.

- **Caching**: Added expo-image library to improve the user experience by caching images.

- **Selfie deletion**: Given the functionality to delete selfies by long pressing the corresponding cards in the selfies list screen. Any number of selfies can be selected for deletion.

- **Image inspection**: Added a component to allow the user to inspect the selfies or the event picture. Also in the selfies list you can traverse the selfies by sweeping left or right or by touching the bottom images previews.