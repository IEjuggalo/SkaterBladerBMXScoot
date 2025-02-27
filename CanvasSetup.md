# Setting Up the Canvas in Unity

## Create and Set Up Canvas:

1. **Create a Canvas and an Image component for the background:**
   - In Unity, right-click in the Hierarchy window and select `UI > Canvas`.
   - Right-click on the Canvas and select `UI > Image`.
   - Set the source image for the background to `UrbanBackground`.

2. **Add Text and Buttons:**
   - Add a Text component for the game title:
     - Right-click on the Canvas and select `UI > Text`.
     - Set its properties (text, font, size, color).
   - Add Button components for each character type:
     - Right-click on the Canvas and select `UI > Button`.
     - Repeat for each character type (Skateboarding, Scooter, BMX, Aggressive Inline).
     - Assign the respective click events in the Inspector.

3. **Verify UI Elements:**
   - Ensure all UI elements are assigned correctly in the Inspector.
   - Check that the buttons are linked to the appropriate methods in the `TitleScreen` script.

By following these steps, your title screen should display correctly with multiple clickable options, and your player character should appear properly.
