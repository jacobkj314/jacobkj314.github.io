import re
from itertools import product, permutations
from random import randint, sample, shuffle

vowels = ['a', 'e', 'i', 'o', 'u']
consonants = ['p', 't', 'k', 'm', 'n']
sigma = vowels + consonants

def tsl_acceptor(tier, restrictions):
    def acceptor(w):
        w_projected = re.sub(f'[^{"".join(tier)}]', '', '>'+w+'<')
        for restriction in restrictions:
            if (r :=''.join(restriction)) in w_projected:
                return False
        return True
    return acceptor

def mtsl_acceptor(tsl_grammars):
    def acceptor(w):
        for tsl_grammar in tsl_grammars:
            if not tsl_acceptor(*tsl_grammar)(w):
                return False
        return True
    return acceptor


def generate_mtsl_acceptor():
    tsl_grammars = [
                        [['>','<']+sigma, [('>','<')]], #prevent empty words
                        [sigma, list(product(vowels, vowels, vowels)) + list(product(consonants, consonants, consonants))]
                   ]
    for _ in range(randint(3,8)):#pick 3-8 tiers
        tier = sample(list(sigma), randint(4,8)) #pick 4-8 symbols for the tier
        if randint(1, 100) < 5:#possbly add word boundaries to the tier
            tier.append('<')
        if randint(1, 100) < 5:
            tier.append('<')
        poss = list(permutations(tier, 2))
        restrictions = sample(poss, randint(7,11))#sample 7-11 possible restrictions for the tier
        tsl_grammars.append((tier, restrictions))
    return mtsl_acceptor(tsl_grammars)

def star(sigma, maxLen, filt=lambda *x:True):
	for count in range(maxLen+1):
		for result in filter(filt, (''.join(w) for w in product(*(sigma for _ in range(count))))):
			yield result

def mitsl_language():
    return list(star(sigma, 5, generate_mtsl_acceptor()))
conlang = mitsl_language()
shuffle(conlang)

url = 'http://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt'

from pyodide.http import open_url

eList = []
with open_url(url) as file:
    eList += file.read().split('\n')

from js import document

table = document.createElement("table") 
tHeader = document.createElement("thead")
hRow = document.createElement("tr")
eHeader = document.createElement('td')
eHeader.innerText = "English Word"
cHeader = document.createElement('td')
cHeader.innerText = "New Word"
hRow.appendChild(eHeader)
hRow.appendChild(cHeader)
tHeader.appendChild(hRow)
table.appendChild(tHeader)

for i in range(min(len(conlang), len(eList))):
    row = document.createElement("tr")

    eCell = document.createElement("td")
    eCell.innerText = eList[i]
    row.appendChild(eCell)

    cCell = document.createElement("td")
    cCell.innerText = conlang[i]
    row.appendChild(cCell)

    table.appendChild(row);

document.body.appendChild(table)
