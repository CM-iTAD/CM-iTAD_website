/* ==========================================================================
   CM-iTAD Lab — content data layer (single source of truth)
   --------------------------------------------------------------------------
   EVERY page renders from this file. To add a project, publication, person,
   or nav entry you edit THIS file only — no HTML changes required.
   Read HANDOFF.md before editing. Each record carries a `provenance` block:
   never add a record without one.
   ========================================================================== */

window.CMITAD = {

  /* ---------------------------------------------------------------- site */
  site: {
    name: "CM-iTAD Lab",
    longName: "Computational Methods and Intelligent Technology in Architecture and Design",
    parent: "Alfaisal University · College of Engineering",
    tagline: "Computation, robotics, and the built environment.",
    url: "https://cm-itad.github.io/CM-iTAD_website/",
    email: "abalymani@alfaisal.edu",
    officialPage: "https://coe.alfaisal.edu/en/cm-itad-research-lab",
    location: "Riyadh, Saudi Arabia",
    // Nav order = the order shown in the header. Add a page here to link it.
    nav: [
      { label: "Research",     href: "research.html" },
      { label: "Teaching",     href: "teaching.html" },
      { label: "Publications", href: "publications.html" },
      { label: "Lab",          href: "lab.html" },
      { label: "About",        href: "about.html" },
      { label: "Collaborate",  href: "collaborate.html" }
    ]
  },

  /* ------------------------------------------------------ research themes
     `id` is referenced by project.category. Keep ids kebab-case and stable:
     they appear in filter URLs. Renaming an id breaks saved links.          */
  categories: [
    { id: "robotic-fabrication",  label: "Robotic Fabrication",  blurb: "Concrete printing, vision-guided assembly, and purpose-built fabrication hardware." },
    { id: "design-intelligence",  label: "Design Intelligence",  blurb: "Graph machine learning and generative methods applied to architectural decisions." },
    { id: "building-performance", label: "Building Performance", blurb: "Thermal, daylight and life-safety simulation from façade detail to urban block." },
    { id: "digital-reality",      label: "Digital Reality",      blurb: "Reconstruction, texturization and IFC-based digital twins of real buildings." },
    { id: "additive-materials",   label: "Additive & Materials", blurb: "Topology optimisation, structural validation, and variable-material printing." }
  ],

  /* -------------------------------------------------------------- projects
     Required: slug, title, category, year, status, summary, provenance.
     Optional: body[], images[], tags[], collaborators[], links[], publicationSlug. */
  projects: [
    {
      slug: "robotic-brick-stacking",
      title: "Robotic brick stacking with computer vision",
      category: "robotic-fabrication",
      year: 2026,
      status: "Active",
      featured: true,
      summary: "A closed-loop masonry workflow where 2D and 3D sensing measure each brick's true pose and the robot compensates every placement.",
      body: [
        "Conventional robotic masonry assumes each component lands exactly where the model says it will. In practice bricks vary, grippers slip, and error accumulates course by course until the wall no longer matches the design.",
        "This project closes that loop. The nominal design is held as a TopologicPy CellComplex; 2D and 3D sensing measure the true pose of every brick as it is placed; hand-eye calibration and tolerance checks reconcile the measurement against the model; and the graph is updated so the next placement is computed against the as-built state rather than the drawing.",
        "The result is tolerance-aware masonry — a prerequisite for putting robotic assembly on a real construction site, where nothing is ever quite where the model expects."
      ],
      images: [
        { src: "assets/img/brick-stacking.jpg", alt: "Graph-based calibration workflow for robotic brick stacking", caption: "Closed-loop workflow: nominal CellComplex, sensing, calibration, graph-informed placement", fit: "contain" }
      ],
      tags: ["Computer vision", "TopologicPy", "Robotic assembly", "Calibration"],
      provenance: { source: "CM-iTAD internal research figure supplied by the lab", added: "2026-09-20", verified: true }
    },
    {
      slug: "concrete-3d-printing",
      title: "Large-scale concrete 3D printing",
      category: "robotic-fabrication",
      year: 2025,
      status: "Active",
      featured: true,
      summary: "A gantry additive platform with a custom concrete mix, used to prototype architectural forms and structural elements at building scale.",
      body: [
        "The lab operates a gantry-based large-scale concrete printer developed around a custom mix tuned for extrudability and early-age strength.",
        "Work on the platform spans the full chain: material mix design, CAM and toolpath generation, print-parameter screening, and the geometric constraints that decide whether a given architectural form can actually be printed.",
        "The platform is the lab's bridge between computational design research and construction-scale output — the point where a geometry that performs well in simulation has to survive contact with a real material."
      ],
      images: [
        { src: "assets/img/printer-wide.jpg", alt: "Gantry-based large-scale concrete 3D printer", caption: "Gantry-based large-scale concrete 3D printer" },
        { src: "assets/img/printer-close.jpg", alt: "Concrete extrusion in progress", caption: "Extrusion in progress — custom concrete mix" }
      ],
      tags: ["Concrete printing", "CAM", "Material mix", "Construction scale"],
      provenance: { source: "CM-iTAD lab photography", added: "2026-09-20", verified: true }
    },
    {
      slug: "topology-optimisation-fea",
      title: "Topology optimisation & FEA for printed parts",
      category: "additive-materials",
      year: 2026,
      status: "Active",
      featured: true,
      summary: "Topology-optimised geometry validated with true 3D finite-element analysis, linking infill pattern and material use to structural performance.",
      body: [
        "Topology optimisation produces efficient geometry, but a printed part is not the idealised solid the optimiser assumed — it is a shell with a patterned infill, anisotropic and full of interfaces.",
        "This project couples optimisation with true 3D finite-element analysis of the printed structure, screening infill patterns and densities against displacement and stress so that material savings are verified rather than assumed.",
        "Results are validated back against sliced G-code, keeping the simulated geometry and the fabricated geometry in agreement."
      ],
      images: [
        { src: "assets/img/fem-displacement.png", alt: "3D finite-element displacement field of a topology-optimised beam", caption: "True 3D finite-element displacement field, MBB beam", fit: "contain" },
        { src: "assets/img/fem-comparison.png", alt: "Comparison of infill patterns under load", caption: "Infill-pattern comparison under identical loading", fit: "contain" }
      ],
      tags: ["Topology optimisation", "FEA", "FDM", "DOLFINx"],
      links: [{ label: "Source repository — MBB-3DP-FEM", href: "https://github.com/libishm1/MBB-3DP-FEM" }],
      provenance: { source: "github.com/libishm1/MBB-3DP-FEM @ main — outputs/fem/", added: "2026-09-20", verified: true }
    },
    {
      slug: "pcm-facades-urban",
      title: "Phase-change materials, from façade to city block",
      category: "building-performance",
      year: 2026,
      status: "Active",
      featured: true,
      summary: "A controlled EnergyPlus experiment on a west-facing Riyadh façade under present, 2050 and 2080 climates — finding that where PCM sits matters far more than how much of it there is.",
      body: [
        "Phase-change materials store and release heat as they melt and solidify, flattening the temperature swing across a façade. Whether they actually do this depends on control: if the material never fully charges or never discharges, it is inert mass.",
        "The façade study locks the ANSI/ASHRAE Standard 140 Case 600 reference building and varies only the west façade, so every difference is attributable to the façade itself. West is chosen as an adversarial orientation — intense low-angle sun in the late afternoon, coincident with peak outdoor temperature and peak utility demand. Eighteen runs (six cases × three climates) completed in EnergyPlus 25.2, with future weather generated by two independent methods that agree within 0.3–0.5 °C.",
        "Two results drive the work. Solar control dominates: fixed louvres cut annual cooling 23–35% and a deployable exterior blind roughly 51%, and those savings largely survive to 2080. PCM placement, tested systematically across four locations, turns out to be decisive in a way capacity is not — the identical material cuts cooling about 2% in the opaque spandrel, 3–4% in the glazing cavity, but 47% when placed in the transmitted-beam path on the floor.",
        "The failure mode matters as much as the saving. Riyadh summer nights now sit at 30–33 °C, warmer than the cooled zone, so passive night ventilation and overnight PCM regeneration cannot run — and the floor placement's benefit erodes from −47% to −31% by 2080 for exactly that reason. Daylight analysis exposes a second tension: external louvres give the best usable daylight but barely control view glare, while blinds and adaptive fins control glare by over-blocking daylight. No single passive device does both.",
        "At urban scale the same question is asked of a Riyadh block: how density and street-level sky-view factor drive the cooling demand that any façade strategy then has to meet."
      ],
      images: [
        { src: "assets/img/pcm-placement-map.png", alt: "Diagram of a west-facing conditioned zone showing PCM in three locations — glazing cavity, opaque spandrel and interior floor — with cooling reductions annotated for present and 2080 climates", caption: "Where the PCM sits: placement in the solar load path, not capacity, is the dominant lever", fit: "contain" },
        { src: "assets/img/pcm-cooling-by-case.png", alt: "Annual cooling energy by façade case across present, 2050 and 2080 climates", caption: "Annual cooling energy by case and climate", fit: "contain" },
        { src: "assets/img/pcm-daylight-tradeoff.png", alt: "Cooling saving plotted against daylight retained for each shading strategy, showing the adaptive fin gaining daylight at almost no cooling cost", caption: "Cooling saving against daylight retained — the core design trade-off", fit: "contain" },
        { src: "assets/img/pcm-city-warming.png", alt: "Projected warming by city between present-day and future climate scenarios", caption: "Projected city warming under the future-weather scenarios", fit: "contain" },
        { src: "assets/img/pcm-louvre.gif", alt: "Adaptive louvre and PCM melt fraction across a 24-hour cycle", caption: "Adaptive louvre control and PCM melt across a 24-hour cycle", fit: "contain" },
        { src: "assets/img/pcm-riyadh.png", alt: "Riyadh urban density, sky-view factor and simulated cooling loads", caption: "Urban density, sky-view factor and simulated zone cooling load — Riyadh", fit: "contain" }
      ],
      tags: ["PCM", "Adaptive façades", "EnergyPlus", "Future climate", "Urban microclimate"],
      provenance: {
        source: "PCM-facades/Experiment_Report/ (report + figures/) and Future_Weather_Report/charts/; CM-iTAD urban simulation outputs",
        added: "2026-09-20",
        verified: true
      }
    },
    {
      slug: "graph-ml-building-ground",
      title: "Graph ML for building–ground topology",
      category: "design-intelligence",
      year: 2022,
      status: "Published",
      featured: true,
      summary: "Unsupervised graph-level representation learning that classifies how a building meets the ground, trained on synthetic 3D topological datasets.",
      body: [
        "How a building meets the ground — separated, on a plinth, adhered, interlocked — is one of the earliest decisions in a design and one of the most consequential for heating, cooling and egress.",
        "This research builds graph machine-learning infrastructure for the AEC sector, training on synthetic 3D topological datasets so that these relationships can be classified without hand-labelled precedent.",
        "The resulting representations feed downstream performance work: thermal studies, fire-egress analysis, and early-stage design search."
      ],
      images: [
        { src: "assets/img/graphml.png", alt: "Graph ML topological dataset classes", caption: "Synthetic 3D topological dataset — separation, plinth, adherence, interlock", fit: "contain" }
      ],
      tags: ["Graph ML", "Unsupervised learning", "Topology", "AEC datasets"],
      links: [
        { label: "Interactive knowledge graph — GML/GNN in AEC", href: "https://gml-aec.vercel.app/" }
      ],
      publicationSlug: "dcc-2022-building-ground",
      provenance: { source: "Alymani, Mujica, Jabi & Corcoran (2022), DCC '22 — figure from lab deck; companion review site at gml-aec.vercel.app", added: "2026-09-20", verified: true }
    },
    {
      slug: "ai-fire-egress",
      title: "AI-informed fire egress from IFC models",
      category: "design-intelligence",
      year: 2025,
      status: "Active",
      summary: "A web-based graph-ML tool that computes optimal evacuation paths directly from IFC building models, linking design geometry to life-safety performance.",
      body: [
        "Fire-egress analysis usually happens late, as a compliance check against a design that is already fixed. Moving it earlier means making it fast enough to run while the geometry is still changing.",
        "The lab's tool reads an IFC model directly, derives the circulation graph, and computes evacuation paths in the browser — so a designer can see the life-safety consequence of a plan change as they make it."
      ],
      images: [
        { src: "assets/img/software-3d.jpg", alt: "Web-based IFC egress analysis tool", caption: "Web-based graph-ML egress tool reading an IFC model" }
      ],
      tags: ["IFC", "Graph ML", "Life safety", "Web tool"],
      provenance: { source: "CM-iTAD lab screenshot", added: "2026-09-20", verified: true }
    },
    {
      slug: "3d-reconstruction-documentation",
      title: "3D reconstruction & architectural documentation",
      category: "digital-reality",
      year: 2025,
      status: "Active",
      summary: "A controlled comparison of open-source reconstruction and texturization platforms, measuring what accessible photogrammetry actually costs in accuracy.",
      body: [
        "Reliable as-built information is the missing input for most retrofit, restoration and monitoring work. Commercial capture is accurate but slow and expensive; the question the lab asks is what can be achieved with free and open-source tooling and a handheld mobile device.",
        "The study builds an image-based photogrammetry setup around a single standardised architectural model, then runs the same dataset through eight platforms — COLMAP, Meshroom, Agisoft Metashape, 3D Zephyr, Regard3D, Polycam, Kiri Engine and Xone — with Autodesk ReCap as the reference. Each result is measured for RMS error against the reference mesh, triangle count, resolution and processing time.",
        "The outcome is a practical accuracy-versus-complexity map rather than a winner. Mobile and cloud tools reach low RMS error with far lighter meshes; several desktop pipelines produce denser geometry without a matching gain in accuracy. Limitations remain real — data management, computational cost and the training required — but open-source tools are competitive enough to change what documentation is affordable.",
        "The pipeline continues through texturization toward IFC-based digital twins, aimed at fast, low-cost documentation of existing structures."
      ],
      images: [
        { src: "assets/img/recon-pipeline.jpg", alt: "Four-panel photogrammetry pipeline: untextured reconstructed mesh, texture atlas, Meshroom node graph and recovered camera positions around the model", caption: "Image-based photogrammetry pipeline — mesh, texture atlas, node graph and recovered camera poses", fit: "contain" },
        { src: "assets/img/recon-accuracy-pareto.jpg", alt: "Pareto analysis plotting RMS error in millimetres against triangle count for eight reconstruction platforms, separated into desktop, mobile/cloud and reference", caption: "Accuracy against mesh complexity across eight reconstruction platforms", fit: "contain" },
        { src: "assets/img/recon-arm.jpg", alt: "Reality-capture and reconstruction work in the lab", caption: "Reconstruction and texturization in the lab" }
      ],
      tags: ["Photogrammetry", "Digital twin", "IFC", "Open source", "Benchmarking"],
      model: {
        src: "assets/models/benchmark-model-polycam.glb",
        poster: "assets/img/recon-model-poster.jpg",
        alt: "Interactive 3D reconstruction of the standardised architectural model used in the benchmark — a green and white façade with three vertical bays and a pointed-arch doorway",
        caption: "The benchmark subject, reconstructed with Polycam — 25,000 triangles from handheld mobile capture. Drag to rotate, scroll to zoom."
      },
      publicationSlug: "sasbe-open-source-reconstruction",
      provenance: {
        source: "3D_Scanning/SASBE_paper_submission/ — manuscript and Figures-Jpg/; CM-iTAD lab photography",
        added: "2026-09-20",
        verified: true
      }
    },
    {
      slug: "custom-robotics-vtol",
      title: "Custom robotics, end-effectors & VTOL platforms",
      category: "robotic-fabrication",
      year: 2025,
      status: "Active",
      summary: "Purpose-built grippers, end-effectors and airframes designed, printed and assembled in-house so fabrication hardware adapts to the research.",
      body: [
        "Off-the-shelf end-effectors constrain what a robot can be asked to do. The lab designs and prints its own — grippers sized to specific components, tools that combine printing with placement, and airframes for aerial capture.",
        "Building the hardware in-house keeps the iteration loop short: a gripper that fails on Monday can be redesigned, printed and back on the arm by Wednesday."
      ],
      images: [
        { src: "assets/img/grippers.jpg", alt: "Custom 3D-printed robotic end-effectors", caption: "Custom 3D-printed robotic end-effectors" },
        { src: "assets/img/vtol.jpg", alt: "In-house printed and assembled VTOL airframe", caption: "Printed and assembled VTOL airframe" }
      ],
      tags: ["End-effectors", "Rapid prototyping", "VTOL", "In-house hardware"],
      provenance: { source: "CM-iTAD lab photography", added: "2026-09-20", verified: true }
    },
    {
      slug: "variable-material-printing",
      title: "Variable-extrusion & carbon-fibre printing",
      category: "additive-materials",
      year: 2025,
      status: "Active",
      summary: "Variable-extrusion carbon-fibre FDM paired with stress simulation, placing material where the structure actually needs it.",
      body: [
        "Uniform extrusion puts the same amount of material everywhere, including where it does nothing. Varying extrusion along the toolpath lets material follow the stress field instead.",
        "The lab pairs variable-extrusion carbon-fibre FDM with stress simulation to test how far that idea can be pushed before print quality or structural performance gives way."
      ],
      images: [
        { src: "assets/img/carbonfiber.jpg", alt: "Variable-extrusion carbon-fibre print with stress simulation", caption: "Variable-extrusion carbon-fibre FDM print, with stress simulation", fit: "contain" }
      ],
      tags: ["Carbon fibre", "Variable extrusion", "Stress-driven toolpaths"],
      provenance: { source: "CM-iTAD lab photography", added: "2026-09-20", verified: true }
    },
    {
      slug: "generative-geometry-benchmarking",
      title: "Encoding architectural intent across generative platforms",
      category: "design-intelligence",
      year: 2026,
      status: "Active",
      summary: "A pre-registered factorial study of how AI image-generation platforms handle architectural instruction, benchmarked against geometry that is hard to fake.",
      body: [
        "Generative design tools are usually demonstrated on geometry that flatters them, and judged on whether the output looks good. That tells you very little about whether the model understood the instruction.",
        "The study treats prompt modality, workflow stage and model architecture as independent variables. Six models are tested across six practitioner workflow stages — brainstorming, material fidelity, spatial instruction, geometric constraint, constant composition, sketch-to-render — over five standardised briefs at two specificity levels. Evaluation is split into three instruments that do not contaminate each other: automated computational geometry metrics, expert architectural quality rating, and failure-mode coding.",
        "A ten-prompt calibration suite with binary pass/fail criteria profiles each model across material literacy, spatial and structural logic, geometric compliance, and scale. The Menger sponge pilot supplies the hostile case: recursive, self-intersecting geometry that a model cannot approximate from style alone. Printing selected results closes the loop — a form a generative tool produces happily but no printer can build is exactly the failure the benchmark exists to catch."
      ],
      images: [
        { src: "assets/img/fractal-cube.jpg", alt: "Printed fractal lattice used as the geometric-compliance benchmark", caption: "Fractal lattice benchmark, printed" },
        { src: "assets/img/generative.jpg", alt: "Generative geometry study output", caption: "Generative geometry study" }
      ],
      tags: ["Generative AI", "Factorial study", "Prompt engineering", "Benchmarking"],
      provenance: {
        source: "GEN_AI_REVIEW/ — Final_Research_Framework.docx, Menger_Pilot_Study.docx, All_50_Prompts_Final.docx, Rating_Sheets_All_Instruments.xlsx, outputs/ (5 model families)",
        added: "2026-09-20",
        verified: false
      }
    },
    {
      slug: "ml-energy-benchmarking",
      title: "Benchmarking machine-learning models for building energy demand",
      category: "design-intelligence",
      year: 2026,
      status: "Active",
      summary: "Eight model families ranked under one protocol for predicting heating and cooling loads across single-zone and multi-zone building topologies.",
      body: [
        "Most building-energy machine-learning papers demonstrate one model family and report that it worked. That leaves a designer with no basis for choosing between them, and no idea whether the result survives a change of building representation.",
        "This study restructures the problem as a comparative benchmark. A simulation-derived dataset of 1,536 cases, generated with the Topologic and TopologicPy parametric workflow, spans 12 building types, four orientations, four glazing ratios, five glazing distributions and two heights — expressed twice, as single-zone Cell and multi-zone CellComplex topologies. That gives four prediction tasks: Cell cooling, Cell heating, CellComplex cooling and CellComplex heating.",
        "Eight model families — Linear, Ridge, RBF-kernel SVR, Random Forest, Gradient Boosting, XGBoost, CatBoost and an ANN/MLP — are compared under one shared train-test split, one cross-validation scheme and one metric set, with every model receiving the identical eight design predictors. Because the information is held constant, the differences reflect the learners rather than unequal inputs.",
        "The two gradient-boosting libraries lead every task. CatBoost records the lowest held-out RMSE in three of the four tasks and the lowest mean error overall; XGBoost takes the fourth. CatBoost also sits at the accuracy-cost knee, training in ten to fifteen seconds and predicting in under twenty microseconds per case. The ANN/MLP does not improve on the tree ensembles under the present tuning budget. Feature-importance analysis identifies wall area, glazing ratio and relative compactness as the dominant design drivers."
      ],
      images: [
        { src: "assets/img/ml-accuracy-cost.png", alt: "Pareto frontier of mean relative RMSE against grid-search training time for eight model families, with CatBoost at the accuracy-cost knee", caption: "Accuracy-cost trade-off across model families — CatBoost sits at the knee", fit: "contain" },
        { src: "assets/img/ml-rmse-heatmap.png", alt: "Heatmap of held-out RMSE for every model family across Cell cooling, Cell heating, CellComplex cooling and CellComplex heating tasks", caption: "Held-out RMSE: every model on every task", fit: "contain" },
        { src: "assets/img/ml-feature-importance.png", alt: "Feature importance compared between Gradient Boosting and Random Forest, showing wall area, glazing ratio and relative compactness as dominant predictors", caption: "Feature importance — Gradient Boosting against Random Forest", fit: "contain" }
      ],
      tags: ["CatBoost", "XGBoost", "Surrogate models", "TopologicPy", "Energy demand"],
      provenance: {
        source: "Machinelearning_comparision/ — Comparative_Study_Multiple_ML_Models_Building_Energy_Demand_Draft_v7_2026-06-08; figures from comparative_study_draft_assets/derived_figures_2026-06-01/",
        added: "2026-09-20",
        verified: false
      }
    }
  ],

  /* -------------------------------------------------------------- teaching
     Student-facing electives and studio modules. Year-indexed, newest first. */
  teaching: [
    {
      year: 2026,
      title: "ARE 435 — Computational fabrication: modular systems, digital workflows & robotic aggregation",
      kind: "Research elective · Fall 2026",
      summary: "A semester-long research studio in which pairs of students develop a parametric modular unit, prove it through laser-cut and printed prototypes, and end by robotically assembling one-metre towers.",
      image: "assets/img/robot-arm2.jpg",
      provenance: { source: "Elective/ARE 435 _2026_Research elective.docx — official course outline, Fall 2026", added: "2026-09-20", verified: true }
    },
    {
      year: 2026,
      title: "Undergraduate research supervision",
      kind: "Supervision",
      summary: "Students join live lab research — future-climate comfort modelling, air-quality prediction and reconstruction benchmarking — through thesis projects and the SURE summer programme.",
      provenance: { source: "SURE-program/ and wegdan-thesis+/ project records", added: "2026-09-20", verified: false }
    },
    {
      year: 2026,
      title: "Acoustics & lighting simulation",
      kind: "Studio module",
      summary: "Simulation-based teaching modules that bring building-performance analysis — acoustics and daylighting — directly into the design studio.",
      provenance: { source: "CM-iTAD lab programme", added: "2026-09-20", verified: true }
    },
    {
      year: 2025,
      title: "Digital fabrication fundamentals",
      kind: "Elective",
      summary: "Hands-on introduction to CAM, toolpath generation and machine constraints across printing, cutting and robotic workflows.",
      image: "assets/img/building-models.jpg",
      provenance: { source: "CM-iTAD lab programme", added: "2026-09-20", verified: true }
    },
    {
      year: 2025,
      title: "Thesis & project research supervision",
      kind: "Supervision",
      summary: "Individual thesis projects across computational design, robotics and building performance, supervised within the lab.",
      provenance: { source: "CM-iTAD lab programme", added: "2026-09-20", verified: true }
    }
  ],

  /* ---------------------------------------------------------- publications
     Optional `status` ("Under review", "In preparation") is appended to the
     authors · venue line. Omit it for published work.                        */
  publications: [
    {
      slug: "sasbe-open-source-reconstruction",
      year: 2026,
      title: "Architectural Documentation Using Open-Source 3D Reconstruction and Texturization Applications",
      authors: "Alymani, A. & Murugesan, L.",
      venue: "Smart and Sustainable Built Environment (SASBE)",
      type: "Journal paper",
      status: "Under review",
      projectSlug: "3d-reconstruction-documentation",
      provenance: {
        source: "3D_Scanning/SASBE_paper_submission/Manuscript-3D Reconstruction and Texturization Applications.docx — title and author list taken from the submitted manuscript",
        added: "2026-09-20",
        verified: true
      }
    },
    {
      slug: "gml-aec-prisma-review",
      year: 2026,
      title: "Corpus-Driven Systematic Review of Graph Machine Learning in AEC",
      authors: "CM-iTAD Lab",
      venue: "Systematic review, PRISMA protocol",
      type: "Review",
      status: "In preparation",
      projectSlug: "graph-ml-building-ground",
      provenance: {
        source: "graph_machine_learning/GML in AEC , a systematic review using PRISMA framework.docx — AUTHOR LIST AND TARGET VENUE NOT STATED IN THE SOURCE; confirm both before publishing",
        added: "2026-09-20",
        verified: false
      }
    },
    {
      slug: "dcc-2022-building-ground",
      year: 2022,
      title: "Classifying Building and Ground Relationships Using Unsupervised Graph-Level Representation Learning",
      authors: "Alymani, A., Mujica, W., Jabi, W. & Corcoran, P.",
      venue: "Design Computing and Cognition (DCC '22)",
      type: "Conference paper",
      projectSlug: "graph-ml-building-ground",
      provenance: { source: "Citation as given in CM-iTAD lab materials", added: "2026-09-20", verified: true }
    }
  ],

  /* ---------------------------------------------------------------- people */
  people: [
    {
      name: "Dr. Abdulrahman Ahmed Alymani",
      role: "Director & Founder",
      email: "abalymani@alfaisal.edu",
      bio: "Founded CM-iTAD and leads its research agenda across computational design, graph machine learning for the AEC sector, and robotic construction. His published work includes unsupervised graph-level representation learning for building–ground topology.",
      provenance: { source: "CM-iTAD lab materials; title confirmed by the lab 2026-09-22", added: "2026-09-20", verified: true }
    },
    {
      name: "Dr. Oriol Carrasco",
      role: "Senior Lecturer of Architecture",
      provenance: { source: "Lab membership and title supplied by the lab 2026-09-22; cross-checked against Projects_Architecture_dept/Faculty_Paper_Contribution_Tracker_Nested.xlsx. BIO PENDING.", added: "2026-09-22", verified: false }
    },
    {
      name: "Dr. Mohammed Alsofiani",
      role: "Assistant Professor of Architectural Engineering",
      provenance: { source: "Lab membership and title supplied by the lab 2026-09-22; cross-checked against Projects_Architecture_dept/Faculty_Paper_Contribution_Tracker_Nested.xlsx. BIO PENDING.", added: "2026-09-22", verified: false }
    },
    {
      name: "Dr. Aliaa Elabd",
      role: "Assistant Professor of Architectural Engineering",
      provenance: { source: "Lab membership and title supplied by the lab 2026-09-22; cross-checked against Projects_Architecture_dept/Faculty_Paper_Contribution_Tracker_Nested.xlsx (spelled 'Aljaa' there — treated as a typo). BIO PENDING.", added: "2026-09-22", verified: false }
    },
    {
      name: "Arch. Libish Murugesan",
      role: "Research Assistant",
      email: "lmurugesan@alfaisal.edu",
      bio: "Works across the lab's fabrication and simulation pipelines — robotic assembly with computer vision, topology optimisation with finite-element validation, and phase-change-material research from façade to urban scale.",
      provenance: { source: "CM-iTAD lab materials", added: "2026-09-20", verified: true }
    },
    {
      name: "Wegdan Maged Alqahtani",
      role: "Teaching Assistant",
      bio: "Researches outdoor thermal comfort under future climate — coupling urban fabric parameters with UTCI and air-quality prediction for Riyadh.",
      provenance: { source: "Lab membership and title supplied by the lab 2026-09-22; research description derived from wegdan-thesis+/ (Combined UTCI Comfort Fabric Study, Future Weather, AQI Prediction) — CONFIRM WORDING WITH HER.", added: "2026-09-22", verified: false }
    },
    {
      name: "Sarah Saddam Muthana",
      role: "Teaching Assistant",
      provenance: { source: "Lab membership and title supplied by the lab 2026-09-22. BIO PENDING.", added: "2026-09-22", verified: false }
    }
  ],

  /* -------------------------------------------------------------- facilities
     `image` is optional — a facility without one renders as a text card.     */
  facilities: [
    { name: "Gantry concrete 3D printer", detail: "Large-scale additive platform with a custom concrete mix for architectural forms and structural elements, run to a documented batch-QC and mix-parameter procedure.", image: "assets/img/printer-wide.jpg" },
    { name: "UR10e arm with OnRobot RG6 gripper", detail: "A Universal Robots UR10e collaborative arm with an OnRobot RG6 two-finger gripper, driven through Grasshopper over RTDE and URScript. Used for pick-and-place, discrete aggregation and vision-guided placement research.", image: "assets/img/robot-arm2.jpg" },
    { name: "Custom end-effectors", detail: "Grippers, fingertip extensions and combined print-and-place tools designed and printed in-house so the hardware adapts to the research rather than the other way round.", image: "assets/img/grippers.jpg" },
    { name: "Force–torque sensing", detail: "Tool-centre-point force and torque readout from the arm, supporting contact-based tasks — surface finishing, compliant placement and assembly that has to react to what it touches rather than run open-loop." },
    { name: "FDM & carbon-fibre printing", detail: "Raise3D Pro3, Bambu Lab X1E and large-format CreatBot D600 Pro2 printers, plus variable-extrusion carbon-fibre composite work for structural prototypes.", image: "assets/img/carbonfiber.jpg" },
    { name: "Laser cutting", detail: "Sheet cutting and engraving for rapid modular prototyping — kirigami and folded-strip studies, interlocking module tests, and 2 mm carbon-fibre tensile coupons. The fast feedback loop on kerf, fit and tolerance that precedes any printed or robotic assembly." },
    { name: "Reality capture & reconstruction", detail: "Handheld and mobile capture feeding a benchmarked open-source stack — COLMAP, Meshroom, Agisoft Metashape, 3D Zephyr, Regard3D, Polycam and Kiri Engine — measured against an Autodesk ReCap reference for texturization and digital-twin work.", image: "assets/img/recon-arm.jpg" },
    { name: "Simulation & computation", detail: "EnergyPlus, Honeybee/Ladybug and Grasshopper for building-performance work, with Python, PyTorch Geometric and TopologicPy for the lab's graph-learning and surrogate-model research.", image: "assets/img/software-3d.jpg" }
  ],

  stats: [
    { n: "11", label: "Active research projects" },
    { n: "8",  label: "Industry & academic collaborators" },
    { n: "5",  label: "Research themes" }
  ],

  /* -------------------------------------------------------------- partners
     Logo tiles. `name` is used as alt text — keep it accurate.             */
  partners: [
    { name: "Cardiff University",        logo: "assets/img/partners/p1.png" },
    { name: "Alchemist",                 logo: "assets/img/partners/p2.png" },
    { name: "Topologic / Zoom3DP / IPROconsult", logo: "assets/img/partners/p3.png" },
    { name: "University of Nottingham",  logo: "assets/img/partners/p4.png" },
    { name: "Tulip Technologies",        logo: "assets/img/partners/p5.png" },
    { name: "King Saud University",      logo: "assets/img/partners/p6.png" },
    { name: "Luyten",                    logo: "assets/img/partners/p7.png" },
    { name: "Research partner",          logo: "assets/img/partners/p8.png" }
  ],

  /* ---------------------------------------------------------- collaborate */
  collaborate: [
    { title: "Joint pilot projects",        body: "Apply concrete printing or robotic assembly to a real component, unit or amenity as a proof-of-concept build." },
    { title: "Design-safety tooling",       body: "Adapt the IFC-based fire-egress and safety analysis tool for use on a partner's own building information models." },
    { title: "Digital-twin documentation",  body: "Use the reconstruction pipeline to create rapid digital twins of completed sites for monitoring and communication." },
    { title: "Talent & internship pipeline", body: "Structured internships and capstone projects placing CM-iTAD students on real innovation initiatives." },
    { title: "Co-branded applied research", body: "Joint papers, case studies and demonstrators in construction and design technology." },
    { title: "Innovation showcase events",  body: "Lab open-days and demonstrations where stakeholders see robotic fabrication and AI design tools in person." }
  ]
};
