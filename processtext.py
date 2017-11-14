### imports
import re

### definitions ###
def removeBrackets(test_str):
    ret = ''
    skip1c = 0
    skip2c = 0
    for i in test_str:
        if i == '[':
            skip1c += 1
        elif i == ']' and skip1c > 0:
            skip1c -= 1
        elif skip1c == 0 and skip2c == 0:
            ret += i
    return ret

### variables ###
sSeason = "20" # only custom season we need thanks to the super tasty CSV file
lCharacters = ["cartman", "kyle", "stan", "kenny", "butters", "chef", "berries"] # get more characters too

### program process ###

# open the season file
sSeasonsFileString = "./data/original/" + sSeason + ".txt"
with open(sSeasonsFileString, 'r') as myfile:
    sText = myfile.read()

# loop through all characters
for sCharacter in lCharacters:
    lCharacterLines = re.findall(r"(?<=" + sCharacter + "\n)(.*)(?=\n)", sText) # this gets every line following a line that is totally empty except for character line
    sCharacterLines = " ".join(lCharacterLines) # join list back to full string
    sCharacterLines = removeBrackets(sCharacterLines) # remove everything in [] (including the '[]' themselves)
    if sCharacterLines != "": # only create file if there is at least one character line
        sTextFileString = "./data/processed/s" + sSeason + "_" + sCharacter + ".txt"
        oTextFile = open(sTextFileString, "w")
        oTextFile.write(sCharacterLines)
        oTextFile.close()
