using UnityEngine;

public class Skateboarder : MonoBehaviour
{
    public string characterName = "Skateboarder";
    public int agility = 80;
    public int balance = 90;
    public int speed = 70;

    public GameObject hoodie;
    public GameObject jeans;
    public GameObject sneakers;
    public GameObject helmet;

    public AnimationClip idleAnimation;
    public AnimationClip walkingAnimation;
    public AnimationClip kickflipAnimation;
    public AnimationClip ollieAnimation;

    private Animator animator;

    void Start()
    {
        SetAppearance();
        SetAnimations();
    }

    void SetAppearance()
    {
        // Load models and materials for appearance
        hoodie = Resources.Load<GameObject>("Models/Hoodie");
        jeans = Resources.Load<GameObject>("Models/Jeans");
        sneakers = Resources.Load<GameObject>("Models/Sneakers");
        helmet = Resources.Load<GameObject>("Models/Helmet");

        // Instantiate models as child objects
        Instantiate(hoodie, transform.position, Quaternion.identity, transform);
        Instantiate(jeans, transform.position, Quaternion.identity, transform);
        Instantiate(sneakers, transform.position, Quaternion.identity, transform);
        Instantiate(helmet, transform.position, Quaternion.identity, transform);
    }

    void SetAnimations()
    {
        // Load animation clips
        idleAnimation = Resources.Load<AnimationClip>("Animations/Idle");
        walkingAnimation = Resources.Load<AnimationClip>("Animations/Walking");
        kickflipAnimation = Resources.Load<AnimationClip>("Animations/Kickflip");
        ollieAnimation = Resources.Load<AnimationClip>("Animations/Ollie");

        // Add animator component if not already present
        animator = gameObject.GetComponent<Animator>();
        if (animator == null)
        {
            animator = gameObject.AddComponent<Animator>();
        }

        AnimatorOverrideController animatorOverrideController = new AnimatorOverrideController(animator.runtimeAnimatorController);
        animator.runtimeAnimatorController = animatorOverrideController;

        animatorOverrideController["Idle"] = idleAnimation;
        animatorOverrideController["Walking"] = walkingAnimation;
        animatorOverrideController["Kickflip"] = kickflipAnimation;
        animatorOverrideController["Ollie"] = ollieAnimation;
    }
}
