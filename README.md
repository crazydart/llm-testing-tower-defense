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

Each tested model is scored across 7 categories totaling 100 points:

| Category | Points | What it measures |
|----------|-------:|------------------|
| Functional Completeness | 15 | All required features (3 towers × 3 levels, 2 enemies, 10 waves, currency) |
| Playability | 15 | Game playable start to finish |
| Bug-free | 15 | No crashes, broken mechanics, or critical UI bugs |
| Balance | 15 | Wins/losses feel earned, difficulty curve makes sense |
| Visuals/UX | 15 | Polish, layout, clarity, look and feel |
| Code Quality | 15 | Organization, naming, modularity, readability of generated code |
| Creativity | 10 | Unique/interesting design choices (path style, mechanics, theme) |

## Tested Models

<table>
  <thead>
    <tr>
      <th>Model</th>
      <th>Func<br/>/15</th>
      <th>Play<br/>/15</th>
      <th>Bug<br/>/15</th>
      <th>Bal<br/>/15</th>
      <th>UX<br/>/15</th>
      <th>CQ<br/>/15</th>
      <th>Crea<br/>/10</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Claude Haiku 4.5</td>
      <td>11</td><td>8</td><td>7</td><td>5</td><td>6</td><td>9</td><td>7</td><td><b>53</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Auto-starts waves on page load (no player control). Severe balance issues with excessive currency. Waves incorrectly go to 11/10. Allows tower placement on track. Jagged enemy path is unique but basic. Class-based code structure with some scattered magic numbers. <a href="haiku/screenshot-wave1.png">Wave 1</a> <a href="haiku/screenshot-wave3.png">Wave 3</a> <a href="haiku/screenshot-wave11.png">Wave 11</a></em></td>
    </tr>
    <tr>
      <td>Claude Opus 4.7</td>
      <td>15</td><td>15</td><td>15</td><td>14</td><td>13</td><td>13</td><td>5</td><td><b>90</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Single HTML file. Free tower placement (not grid-based). Well-balanced throughout 10 waves. Good graphics, smooth performance. Tower radius visualization and collision detection work correctly. Clean modular structure with constants and good separation of concerns. <a href="opus47/screenshot.png">Screenshot</a></em></td>
    </tr>
    <tr>
      <td>Claude Sonnet 4.6</td>
      <td>15</td><td>15</td><td>15</td><td>14</td><td>12</td><td>11</td><td>7</td><td><b>89</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Single HTML file. Grid-based tower placement with snap-to-grid. Game UI centers on screen (unique). Very balanced gameplay that becomes challenging. Good organization with proper constants but heavy abbreviations reduce readability. <a href="sonnet46/screenshot.png">Screenshot</a></em></td>
    </tr>
    <tr>
      <td>DeepSeek V3.1 671B</td>
      <td>9</td><td>3</td><td>5</td><td>3</td><td>8</td><td>6</td><td>3</td><td><b>37</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Tower placement offset from click location. Cannot kill first wave. Code uses extensive abbreviations and condensed syntax, long functions with multiple responsibilities, hard to follow. <a href="deepseek-v3.1-671b/screenshot.png">Screenshot</a></em></td>
    </tr>
    <tr>
      <td>DeepSeek V3.2</td>
      <td>15</td><td>13</td><td>10</td><td>8</td><td>11</td><td>14</td><td>9</td><td><b>80</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Developed with server infrastructure and documentation (uniquely creative approach). Balance breaks around wave 7 due to excess currency. Level frame UI bug (off-screen). Excellent code: split into HTML and separate JS file with well-designed Game/Tower/Enemy classes, strong encapsulation and modularity. <a href="deepseek-v3.2/screenshot.png">Screenshot</a></em></td>
    </tr>
    <tr>
      <td>Gemma 4 31B</td>
      <td>13</td><td>9</td><td>8</td><td>10</td><td>9</td><td>13</td><td>8</td><td><b>70</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Full-window UX. Click coordinate offset makes placement difficult. Unique design: tower placement only between waves (not during). Clear tower descriptions. Excellent multi-file structure with separate index.html, game.js, and style.css; clear class structure and modular architecture. <a href="gemma4-31b/screenshot.png">Screenshot</a></em></td>
    </tr>
    <tr>
      <td>GLM 5.1</td>
      <td>15</td><td>14</td><td>14</td><td>12</td><td>12</td><td>9</td><td>5</td><td><b>81</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Grid-based placement. Challenging balance: starts with 30 gold but cheapest tower costs 50, making wave 1 difficult but winnable. Polished tower selection/upgrade UI. Tile-based organization with proper constants but some duplicated drawing code and magic numbers in wave config. <a href="gml5/screenshot.png">Screenshot</a></em></td>
    </tr>
    <tr>
      <td>Kimi K2.5</td>
      <td>6</td><td>2</td><td>1</td><td>2</td><td>9</td><td>9</td><td>3</td><td><b>32</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Critical bug: enemies cannot be killed - health goes negative instead of dying. Game unplayable as enemies persist indefinitely. Code has decent helper functions but many magic numbers and repetitive UI update logic. <a href="kimi-k2.5/screenshot.png">Screenshot</a></em></td>
    </tr>
    <tr>
      <td>Kimi K2.6</td>
      <td>15</td><td>15</td><td>15</td><td>11</td><td>13</td><td>7</td><td>5</td><td><b>81</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Game works perfectly. Grid-based placement. Polished UI with stats panel, tower info, range visualization. Slightly easy - first 4 waves beatable with initial towers. Code is functional but messy: extremely condensed with heavy abbreviations (dt, fx, e, t), long multi-purpose functions, no class structure. <a href="kimi-k2.6/screenshot.png">Screenshot</a></em></td>
    </tr>
    <tr>
      <td>Llama 3.3 70B (UD-Q5_K_XL)</td>
      <td>4</td><td>0</td><td>0</td><td>0</td><td>0</td><td>8</td><td>0</td><td><b>12</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Crashes immediately with "Cannot read properties of undefined (reading 'health')" in startWave function. Game unplayable. Code is functional but messy with scattered global variables and inconsistent naming.</em></td>
    </tr>
    <tr>
      <td>Llama 3.3 70B (Dense, OpenRouter)</td>
      <td>4</td><td>2</td><td>5</td><td>2</td><td>2</td><td>5</td><td>1</td><td><b>21</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Very basic. No actual path system - enemies are random moving blobs. Random tower placement (clicking button places at random coordinates). Plain white background, no styling. Required Chat mode workaround due to Continue plugin issues. Code has minimal organization, hardcoded logic, magic numbers everywhere. <a href="llama33-70b-dense/screenshot.png">Screenshot</a></em></td>
    </tr>
    <tr>
      <td>MiniMax M2.7</td>
      <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td><b>1</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Generated SPEC.md (detailed game specification) instead of actual game implementation. No HTML/JavaScript files. Continue AI plugin got stuck in error loops.</em></td>
    </tr>
    <tr>
      <td>Qwen 3 Coder Next</td>
      <td>12</td><td>6</td><td>8</td><td>4</td><td>10</td><td>11</td><td>4</td><td><b>55</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Game board too tall for viewport. Functions but severely unbalanced - wave 1 unwinnable due to currency vs tower cost gap. Clear UI organization. Solid code structure with class-based tower/enemy types but contains magic numbers and inconsistent naming. <a href="qwen3-coder-next/screenshot.png">Screenshot</a></em></td>
    </tr>
    <tr>
      <td>Qwen 3.5 27B (FP8)</td>
      <td>11</td><td>2</td><td>2</td><td>2</td><td>11</td><td>12</td><td>5</td><td><b>45</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Attractive gradient buttons. Tower placement bug requires multiple clicks. Critical issue: enemies take no damage. Unplayable despite polished visuals. Code is well-organized with classes and constants, minor issues with magic numbers and redundant UI logic. <a href="qwen35-27b/screenshot.png">Screenshot</a></em></td>
    </tr>
    <tr>
      <td>Qwen 3.5 35B (UD-Q8_K_XL)</td>
      <td>9</td><td>0</td><td>0</td><td>0</td><td>10</td><td>10</td><td>3</td><td><b>32</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Good UX design but crashes with "Cannot read properties of undefined (reading 'clientX')" - mouse event tracking not initialized. Requires server. Decent class structure but some duplication and inconsistent property naming. <a href="qwen35-35b-a3b/screenshot.png">Screenshot</a></em></td>
    </tr>
    <tr>
      <td>Qwen 3.5 397B</td>
      <td>12</td><td>6</td><td>5</td><td>7</td><td>10</td><td>11</td><td>4</td><td><b>55</b></td>
    </tr>
    <tr>
      <td colspan="9"><em>Good initial UX, polished design. Visual glitch on tower upgrade click (stretching). Click handling breaks - clicking towers places new towers instead of upgrading. Tower selection buttons unreliable. Good use of Tower/Enemy/Projectile classes and constants but contains technical debt with hardcoded cost calculations. <a href="qwen35-397b/screenshot.png">Screenshot</a></em></td>
    </tr>
  </tbody>
</table>

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
