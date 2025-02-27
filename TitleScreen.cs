using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class TitleScreen : MonoBehaviour
{
    public Image backgroundImage;
    public Text gameTitle;
    public Button skateboardingButton;
    public Button scooterButton;
    public Button bmxButton;
    public Button inlineSkatingButton;

    void Start()
    {
        // Set background image
        backgroundImage.sprite = Resources.Load<Sprite>("Images/UrbanBackground");

        // Set game title properties
        gameTitle.text = "SkaterBladerBMXScoot";
        gameTitle.fontSize = 48;
        gameTitle.color = Color.red;
        gameTitle.alignment = TextAnchor.MiddleCenter;
        CenterElement(gameTitle.rectTransform, new Vector2(0.5f, 0.75f));

        // Assign button click events
        skateboardingButton.onClick.AddListener(() => StartGame("Skateboarding"));
        scooterButton.onClick.AddListener(() => StartGame("Scooter"));
        bmxButton.onClick.AddListener(() => StartGame("BMX"));
        inlineSkatingButton.onClick.AddListener(() => StartGame("Aggressive Inline"));

        // Center buttons
        CenterElement(skateboardingButton.GetComponent<RectTransform>(), new Vector2(0.5f, 0.5f));
        CenterElement(scooterButton.GetComponent<RectTransform>(), new Vector2(0.5f, 0.4f));
        CenterElement(bmxButton.GetComponent<RectTransform>(), new Vector2(0.5f, 0.3f));
        CenterElement(inlineSkatingButton.GetComponent<RectTransform>(), new Vector2(0.5f, 0.2f));
    }

    void StartGame(string characterType)
    {
        PlayerPrefs.SetString("SelectedCharacter", characterType);
        SceneManager.LoadScene("GameScene");
    }

    void CenterElement(RectTransform rectTransform, Vector2 anchor)
    {
        rectTransform.anchorMin = anchor;
        rectTransform.anchorMax = anchor;
        rectTransform.anchoredPosition = Vector2.zero;
    }
}
