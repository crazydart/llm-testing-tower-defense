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

## Tested Models

| Model | Tested | Success | Notes |
|-------|--------|---------|-------|
| Claude Haiku 4.5 | ✓ | ~ | Single HTML file. Auto-starts waves on page load (no player control). Severe balance issues with excessive currency earnings. Waves incorrectly go to 11/10. Tower placement allows placement on track (should be prevented). Jagged enemy path is unique but visually basic. [Wave 1](haiku/screenshot-wave1.png) [Wave 3](haiku/screenshot-wave3.png) [Wave 11](haiku/screenshot-wave11.png) |
| Claude Opus 4.7 | ✓ | ✓ | Single HTML file implementation. Excellent with free tower placement (not grid-based). Well-balanced throughout all 10 waves. Good graphics and smooth performance. Tower radius visualization and collision detection both work correctly. All features implemented. [Screenshot](opus47/screenshot.png) |
| Claude Sonnet 4.6 | ✓ | ✓ | Single HTML file. Grid-based tower placement with snap-to-grid mechanics. Limiting but works well and feels polished. Game UI centers on screen (distinguishing feature). Very balanced gameplay that becomes challenging. All features implemented. [Screenshot](sonnet46/screenshot.png) |
| DeepSeek V3.1 671B | ✓ | ✗ | Tower placement is offset from click location making accurate placement difficult. Game balance is way off - cannot kill first wave. [Screenshot](deepseek-v3.1-671b/screenshot.png) |
| DeepSeek V3.2 | ✓ | ✓ | Developed with server infrastructure and documentation. Game runs smoothly; balance breaks around wave 7 due to excess currency. Level frame UI bug (off-screen). All features implemented. [Screenshot](deepseek-v3.2/screenshot.png) |
| Gemma 4 31B | ✓ | ~ | Full-window UX. Click coordinate offset makes tower placement difficult and inaccurate. Unique design choice: tower placement disabled during waves (only allowed between waves). Clear UI with good tower descriptions. [Screenshot](gemma4-31b/screenshot.png) |
| GLM 5.1 | ✓ | ✓ | Good UX with grid-based placement. Challenging balance: starts with 30 gold but cheapest tower costs 50, making wave 1 difficult but winnable. Tower selection and upgrade UI are polished. All features implemented. [Screenshot](gml5/screenshot.png) |
| Kimi K2.5 | ✓ | ✗ | Reasonable UX with clear tower selection. Critical bug: enemies cannot be killed - health goes negative instead of dying when reaching 0. Game becomes unplayable as enemies persist indefinitely despite taking damage. [Screenshot](kimi-k2.5/screenshot.png) |
| Kimi K2.6 | ✓ | ✓ | Game works perfectly. Grid-based placement (not free place). Polished UI with stats panel, tower info, and range visualization. Slightly unbalanced - first 4 waves can be beaten with the initial set of towers without upgrades. All features implemented. [Screenshot](kimi-k2.6/screenshot.png) |
| Llama 3.3 70B (UD-Q5_K_XL) | ✓ | ✗ | Game does not work. Crashes immediately with "Cannot read properties of undefined (reading 'health')" in startWave function. The wave initialization tries to access enemy health before the wave/enemy data is properly set up. Game unplayable. |
| Llama 3.3 70B (Dense, OpenRouter) | ✓ | ✗ | Very basic implementation. No actual path system - enemies are just random moving blobs. No proper game mechanics. Tower placement is random (clicking button places tower at random coordinates). Plain white background with no styling. Very poor UX. Initial test had Continue plugin in Agent mode producing JSON function calls; switching to Chat mode produced this output. [Screenshot](llama33-70b-dense/screenshot.png) |
| MiniMax M2.7 | ✓ | ✗ | Generated SPEC.md (detailed game specification) instead of actual game implementation. No HTML/JavaScript files created. When Continue AI plugin attempted to use it, got stuck in error loops trying to execute a non-functional output. |
| Qwen 3 Coder Next | ✓ | ~ | Game board is too tall for viewport. Functionality works but unbalanced: starting with $10 while towers cost $50-$200 makes wave 1 unwinnable. Tower descriptions and UI are clear and well-organized. [Screenshot](qwen3-coder-next/screenshot.png) |
| Qwen 3.5 27B (FP8) | ✓ | ✗ | Good UX with attractive gradient buttons. Tower placement has initial bug but works after multiple clicks. Critical issue: enemies take no damage and cannot be killed. Game is unplayable despite polished visuals. [Screenshot](qwen35-27b/screenshot.png) |
| Qwen 3.5 35B (UD-Q8_K_XL) | ✓ | ✗ | Good UX design with nice visuals, but has critical bugs. Crashes with "Cannot read properties of undefined (reading 'clientX')" - mouse event tracking not properly initialized. Requires server to run due to resource loading issues. [Screenshot](qwen35-35b-a3b/screenshot.png) |
| Qwen 3.5 397B | ✓ | ~ | Good initial UX with polished design. Starts functional but deteriorates quickly. Visual glitch when clicking tower to upgrade (stretching effect). Click handling breaks after initial interaction - clicking towers places new towers instead of upgrading. Tower selection buttons buggy and unreliable. [Screenshot](qwen35-397b/screenshot.png) |

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
