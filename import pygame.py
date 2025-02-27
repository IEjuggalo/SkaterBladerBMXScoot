import pygame
import random

# Initialize Pygame
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Set up the display
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Scooter Game")

# Load images
scooter_img = pygame.image.load('scooter.png')
obstacle_img = pygame.image.load('obstacle.png')
goal_img = pygame.image.load('goal.png')

# Define the Scooter class
class Scooter(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = scooter_img
        self.rect = self.image.get_rect()
        self.rect.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT - 50)
        self.speed = 5

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT] and self.rect.left > 0:
            self.rect.x -= self.speed
        if keys[pygame.K_RIGHT] and self.rect.right < SCREEN_WIDTH:
            self.rect.x += self.speed

# Define the Obstacle class
class Obstacle(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = obstacle_img
        self.rect = self.image.get_rect()
        self.rect.x = random.randint(0, SCREEN_WIDTH - self.rect.width)
        self.rect.y = random.randint(-100, -40)
        self.speed = random.randint(3, 8)

    def update(self):
        self.rect.y += self.speed
        if self.rect.top > SCREEN_HEIGHT:
            self.rect.x = random.randint(0, SCREEN_WIDTH - self.rect.width)
            self.rect.y = random.randint(-100, -40)
            self.speed = random.randint(3, 8)

# Define the Goal class
class Goal(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = goal_img
        self.rect = self.image.get_rect()
        self.rect.center = (SCREEN_WIDTH // 2, 50)

# Create sprite groups
all_sprites = pygame.sprite.Group()
obstacles = pygame.sprite.Group()

# Create instances of Scooter and Goal
scooter = Scooter()
goal = Goal()

all_sprites.add(scooter)
all_sprites.add(goal)

# Create obstacles
for _ in range(10):
    obstacle = Obstacle()
    all_sprites.add(obstacle)
    obstacles.add(obstacle)

# Game loop
running = True
clock = pygame.time.Clock()

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Update
    all_sprites.update()

    # Check for collisions
    if pygame.sprite.spritecollideany(scooter, obstacles):
        print("Game Over!")
        running = False

    if pygame.sprite.collide_rect(scooter, goal):
        print("You Win!")
        running = False

    # Draw
    screen.fill(WHITE)
    all_sprites.draw(screen)
    pygame.display.flip()

    # Cap the frame rate
    clock.tick(60)

pygame.quit()
