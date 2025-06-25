# Task-LP

Prerequisites: 

Before testing, change the GitHub login details found in LoginPage.ts to your desired ones. 

The tests are meant to be run in the order that they are written. (Creation => Update => Auto Merges => Deletion).


As my spread out comments might indicate, I would want to condense the tests, as they do share repetitive actions.

I thought about checking the page title for the repo name, but getting it was a small hassle. 

Simplest alternative was to check the big title every repo has.



I wanted to compact the Update Repo and Delete Repo tasks into methods under RepoPage.ts, 

which would click through everything and finish with an expect in the spec.ts file. 

However, there is an annoying notification (also present when doing it manually) that was solved with an expect.



When deleting, I thought about grabbing the text from the box, stripping it from the rest of the text, quotes, etc. 

However, unless GitHub changes something, the page title is right there and ready to go.



Additionally, I thought about creating some sort of a check if the CreateRepo or UpdateRepo repos already exist,

and, if they do, run a quick delete before the respective tests proceed, but I think that that is outside the scope of this task.

If I had to add such a functionality to the current project, it would be in the shape of another test with 2 if statements.

One for CreateRepo, and another one for UpdateRepo, if present, speedrun the deletion process, similar to the Delete repo test.