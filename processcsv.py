import pandas as pd

lSeasonNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']
lCharacters = ['Cartman', 'Kyle', 'Stan', 'Kenny', 'Butters', 'PC Principal', 'Chef', 'Tweak', 'Craig', 'Mr. Mackey']

for sSeasonNumber in lSeasonNumbers:
    for sCharacter in lCharacters:
        df = pd.read_csv('./data/original/Season-' + sSeasonNumber + '.csv'); # read in data
        df = df[df['Character'] == sCharacter] # overwrite itself with the filtered dataframe
        if len(df) == 0:
            continue # don't write a csv if there is no lines for the character in this season!
        df.to_csv('./data/processed/s' + sSeasonNumber + '_' + sCharacter.replace(" ","").lower() + '.txt' , header=None, index=None, sep=' ', mode='a') # write that data to a raw text for our markov chains
