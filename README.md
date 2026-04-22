# LLM Tower Defense Game Testing

This project tests different Large Language Models (LLMs) by having them build a tower defense game from a single prompt in **one shot** (no iterations or corrections).

## Project Overview

Each LLM model receives the exact same specification prompt and is tasked with creating a complete, playable browser-based tower defense game. The results demonstrate how different models approach the same problem, handle complexity, and implement features.

This project is hosted as a public GitHub repository for transparency and to showcase LLM capabilities in web game development.

## The Specification

Each model is given the following prompt (see `prompt.md` for details):

- Create a **browser-based tower defense game**
- Implement **3 tower types** with **3 upgrade levels each**
- Include **2 enemy types**
- Build **1 level with 10 waves** of increasing difficulty
- Create a **currency system** (starting with enough to build initial towers, earning from defeated enemies)

## Project Structure

```
llm-testing-tower-defense/
├── README.md (this file)
├── prompt.md (the specification given to each model)
├── {model-name}/ (one directory per tested model)
│   ├── index.html
│   ├── game.js
│   ├── README.md (model-specific notes)
│   └── [other assets as generated]
```

## Scoring Methodology

Each tested model is scored across 6 categories totaling 100 points:

| Category | Points | What it measures |
|----------|-------:|------------------|
| Functional Completeness | 20 | All required features (3 towers × 3 levels, 2 enemies, 10 waves, currency) |
| Playability | 20 | Game playable start to finish |
| Bug-free | 15 | No crashes, broken mechanics, or critical UI bugs |
| Balance | 15 | Wins/losses feel earned, difficulty curve makes sense |
| Visuals/UX | 15 | Polish, layout, clarity, look and feel |
| Creativity | 15 | Unique/interesting design choices (path style, mechanics, theme) |

## Tested Models

| Model | Func/20 | Play/20 | Bug/15 | Bal/15 | UX/15 | Crea/15 | **Total** | Notes |
|-------|--------:|--------:|-------:|-------:|------:|--------:|----------:|-------|
| Claude Haiku 4.5 | 14 | 10 | 7 | 5 | 6 | 10 | **52** | Auto-starts waves on page load (no player control). Severe balance issues with excessive currency. Waves incorrectly go to 11/10. Allows tower placement on track. Jagged enemy path is unique but basic. [Wave 1](haiku/screenshot-wave1.png) [Wave 3](haiku/screenshot-wave3.png) [Wave 11](haiku/screenshot-wave11.png) |
| Claude Opus 4.7 | 20 | 20 | 15 | 14 | 13 | 8 | **90** | Single HTML file. Free tower placement (not grid-based). Well-balanced throughout 10 waves. Good graphics, smooth performance. Tower radius visualization and collision detection work correctly. [Screenshot](opus47/screenshot.png) |
| Claude Sonnet 4.6 | 20 | 20 | 15 | 14 | 12 | 10 | **91** | Single HTML file. Grid-based tower placement with snap-to-grid. Game UI centers on screen (unique). Very balanced gameplay that becomes challenging. [Screenshot](sonnet46/screenshot.png) |
| DeepSeek V3.1 671B | 12 | 4 | 5 | 3 | 8 | 5 | **37** | Tower placement offset from click location. Cannot kill first wave. [Screenshot](deepseek-v3.1-671b/screenshot.png) |
| DeepSeek V3.2 | 20 | 17 | 10 | 8 | 11 | 13 | **79** | Developed with server infrastructure and documentation (uniquely creative approach). Balance breaks around wave 7 due to excess currency. Level frame UI bug (off-screen). [Screenshot](deepseek-v3.2/screenshot.png) |
| Gemma 4 31B | 17 | 12 | 8 | 10 | 9 | 12 | **68** | Full-window UX. Click coordinate offset makes placement difficult. Unique design: tower placement only between waves (not during). Clear tower descriptions. [Screenshot](gemma4-31b/screenshot.png) |
| GLM 5.1 | 20 | 18 | 14 | 12 | 12 | 7 | **83** | Grid-based placement. Challenging balance: starts with 30 gold but cheapest tower costs 50, making wave 1 difficult but winnable. Polished tower selection/upgrade UI. [Screenshot](gml5/screenshot.png) |
| Kimi K2.5 | 8 | 2 | 1 | 2 | 9 | 5 | **27** | Critical bug: enemies cannot be killed - health goes negative instead of dying. Game unplayable as enemies persist indefinitely. [Screenshot](kimi-k2.5/screenshot.png) |
| Kimi K2.6 | 20 | 20 | 15 | 11 | 13 | 8 | **87** | Game works perfectly. Grid-based placement. Polished UI with stats panel, tower info, range visualization. Slightly easy - first 4 waves beatable with initial towers. [Screenshot](kimi-k2.6/screenshot.png) |
| Llama 3.3 70B (UD-Q5_K_XL) | 5 | 0 | 0 | 0 | 0 | 0 | **5** | Crashes immediately with "Cannot read properties of undefined (reading 'health')" in startWave function. Game unplayable. |
| Llama 3.3 70B (Dense, OpenRouter) | 5 | 3 | 5 | 2 | 2 | 2 | **19** | Very basic. No actual path system - enemies are random moving blobs. Random tower placement (clicking button places at random coordinates). Plain white background, no styling. Required Chat mode workaround due to Continue plugin issues. [Screenshot](llama33-70b-dense/screenshot.png) |
| MiniMax M2.7 | 0 | 0 | 0 | 0 | 0 | 2 | **2** | Generated SPEC.md (detailed game specification) instead of actual game implementation. No HTML/JavaScript files. Continue AI plugin got stuck in error loops. |
| Qwen 3 Coder Next | 16 | 8 | 8 | 4 | 10 | 6 | **52** | Game board too tall for viewport. Functions but severely unbalanced - wave 1 unwinnable due to currency vs tower cost gap. Clear UI organization. [Screenshot](qwen3-coder-next/screenshot.png) |
| Qwen 3.5 27B (FP8) | 14 | 3 | 2 | 2 | 11 | 7 | **39** | Attractive gradient buttons. Tower placement bug requires multiple clicks. Critical issue: enemies take no damage. Unplayable despite polished visuals. [Screenshot](qwen35-27b/screenshot.png) |
| Qwen 3.5 35B (UD-Q8_K_XL) | 12 | 0 | 0 | 0 | 10 | 5 | **27** | Good UX design but crashes with "Cannot read properties of undefined (reading 'clientX')" - mouse event tracking not initialized. Requires server. [Screenshot](qwen35-35b-a3b/screenshot.png) |
| Qwen 3.5 397B | 16 | 8 | 5 | 7 | 10 | 6 | **52** | Good initial UX, polished design. Visual glitch on tower upgrade click (stretching). Click handling breaks - clicking towers places new towers instead of upgrading. Tower selection buttons unreliable. [Screenshot](qwen35-397b/screenshot.png) |

More models will be added over time.

## How to View Results

1. Clone this repository
2. Navigate to any model directory (e.g., `cd opus47/`)
3. Open `index.html` in a web browser
4. Play the generated tower defense game!

Each model's implementation is completely independent and self-contained within its directory.

## Comparison Notes

To compare how different models handled the same specification:

1. Review the generated `index.html` and `game.js` for code style and architecture
2. Read the `README.md` in each model directory for implementation details
3. Play each game to compare gameplay, balance, and features
4. Look for differences in:
   - Code organization and structure
   - Feature completeness
   - Game balance and difficulty
   - UI/UX design
   - Performance

## Contributing

This is a testing repository. To add results from a new model:

1. Create a new directory with the model name (e.g., `claude-opus/`)
2. Run the prompt from `prompt.md` against that model
3. Save the generated files in that directory
4. Add a README describing the model and any notable implementation details
5. Update the model list above

## License

Each model's implementation retains its own licensing. This testing project is provided as-is for research and comparison purposes.
