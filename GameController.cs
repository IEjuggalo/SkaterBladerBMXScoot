using UnityEngine;

public class GameController : MonoBehaviour
{
    public GameObject skateboarderPrefab;
    public GameObject scooterRiderPrefab;
    public GameObject bmxBikerPrefab;
    public GameObject inlineSkaterPrefab;

    void Start()
    {
        string selectedCharacter = PlayerPrefs.GetString("SelectedCharacter", "Skateboarding");

        switch (selectedCharacter)
        {
            case "Skateboarding":
                Instantiate(skateboarderPrefab, Vector3.zero, Quaternion.identity);
                break;
            case "Scooter":
                Instantiate(scooterRiderPrefab, Vector3.zero, Quaternion.identity);
                break;
            case "BMX":
                Instantiate(bmxBikerPrefab, Vector3.zero, Quaternion.identity);
                break;
            case "Aggressive Inline":
                Instantiate(inlineSkaterPrefab, Vector3.zero, Quaternion.identity);
                break;
            default:
                Instantiate(skateboarderPrefab, Vector3.zero, Quaternion.identity);
                break;
        }
    }
}
