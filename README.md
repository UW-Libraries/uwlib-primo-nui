# UW Primo New UI Dev Setup

This repo is a clone of Ex Libris's [primo-explore-devenv](https://github.com/ExLibrisGroup/primo-explore-devenv) repo but with UW specific files in there. When you first clone it, you need to run the following command within the cloned directory:

`git remote add upstream https://github.com/ExLibrisGroup/primo-explore-devenv.git`

This will enable you to pull from the Ex Libris repo in case they push out an update.

## To Get Update from Ex Libris

```
git fetch upstream master
git merge upstream/master
git push
```

## Pushing Commits To This Repo

To view/confirm what files of your local copies have changed:
`git status`

This will show which files differ from the remote copies and which ones (if any) are staged for commit. To stage files for commit:
`git add FILE_NAME`

You can then 'git status' again to check, and to commit the staged files:
`git commit`

Enter a comment describing the commit (if you're using the github client/gitBASH, this is in 'vi' syntax/style).

At this point, the commit is still staged on your machine. It must still be pushed to the remote repository (GitHub).

To make sure everything gets added correctly, be sure to be specific when pushing changes up to this BitBucket repo:

`git push origin BRANCH_NAME`

e.g.

`git push origin master`

## Using the primo-devenv

Refer to the instructions on the [primo-explore-devenv](https://github.com/ExLibrisGroup/primo-explore-devenv) repo for instructions on how to run a development instance and create packages for upload into the Primo Back Office.

