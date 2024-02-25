document.addEventListener("DOMContentLoaded", function() {

    let grouped = false;

    chrome.tabs.query({}, tabs => {
        
        
        
        const tabsList = document.getElementById('tabsList');
        const currentTime = new Date();
        tabs.sort((a, b) =>     {
            const deactivatedDurationA = Math.round((currentTime - a.lastAccessed)/1000);
            const deactivatedDurationB = Math.round((currentTime - b.lastAccessed)/1000);
            return deactivatedDurationA - deactivatedDurationB;
        });
    
        
        tabs.forEach(tab => {
            const tabItem = document.createElement('div');
            tabItem.classList.add('tab_section');
            const tabIcon = document.createElement('img');

            if (tab.favIconUrl) {
                tabIcon.src = tab.favIconUrl;
            } else {
                tabIcon.src = 'noIcon.png';
            }
  
            
            tabIcon.classList.add('tab-icon');
            const tabTitle = document.createElement('span');
            tabTitle.textContent = tab.title;
            tabTitle.classList.add('tab_title')
            tabItem.appendChild(tabIcon);
            tabItem.appendChild(tabTitle);
            

            const clockIcon = document.createElement('img');
            clockIcon.src = 'clock icon.png';
            clockIcon.classList.add('clock');


            const currentTime = new Date();
            const tabDuration = document.createElement('span');
            const deactivatedDuration = Math.round((currentTime - tab.lastAccessed)/1000);
            const deactivatedDuration_sec = Math.round(deactivatedDuration%60);
            const deactivatedDuration_min_raw = Math.floor(deactivatedDuration/60);
            const deactivatedDuration_min = Math.floor(deactivatedDuration_min_raw%60);
            const deactivatedDuration_hour = Math.floor(deactivatedDuration_min_raw/60);

            
            if (!(deactivatedDuration_hour===0))
                tabDuration.textContent = `${deactivatedDuration_hour.toLocaleString('en-US', {
                    minimumIntegerDigits:2,
                    useGrouping: false})}:${deactivatedDuration_min.toLocaleString('en-US', {
                        minimumIntegerDigits:2,
                        useGrouping: false})}:${deactivatedDuration_sec.toLocaleString('en-US', {
                            minimumIntegerDigits:2,
                            useGrouping: false})}`
            else if (!(deactivatedDuration_min===0))
                tabDuration.textContent = `00:${deactivatedDuration_min.toLocaleString('en-US', {
                    minimumIntegerDigits:2,
                    useGrouping: false})}:${deactivatedDuration_sec.toLocaleString('en-US', {
                    minimumIntegerDigits:2,
                    useGrouping: false})}`
            else 
                tabDuration.textContent = `00:00:${deactivatedDuration_sec.toLocaleString('en-US', {
                    minimumIntegerDigits:2,
                    useGrouping: false})}`

            const clockAndTabDuration = document.createElement('span');
            clockAndTabDuration.appendChild(clockIcon);
            clockAndTabDuration.appendChild(tabDuration);
            tabItem.appendChild(clockAndTabDuration)

            
            
            tabsList.appendChild(tabItem);
            tabItem.addEventListener('click', () => {
                chrome.tabs.update(tab.id, { active: true });
            });
        });
    });

document.getElementById('refreshButton').addEventListener('click', function() {
        
    // Clear the search input
    
    
    tabSections = document.getElementsByClassName('tab_section');

    for (i = 0; i < tabSections.length; i++) {
    tabSections[i].style.display = '';
    }
});
    // Refresh the search results
    // This depends on how your search functionality is implemented
    

//refresh button done   
    
    document.getElementById('Search').addEventListener('click', function() {
        var input, filter, tabSections, tabTitle, i, txtValue;
        input = document.getElementById('searchBar');
        filter = input.value.toUpperCase();
        tabSections = document.getElementsByClassName('tab_section');
    
        for (i = 0; i < tabSections.length; i++) {
            tabTitle = tabSections[i].getElementsByClassName('tab_title')[0];
            txtValue = tabTitle.textContent || tabTitle.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tabSections[i].style.display = '';
            } else {
                tabSections[i].style.display = 'none';
            }
        }
    });
    document.getElementById('Ungroup').addEventListener('click', function() {
        
        grouped = false;

        // Clear the categorized state from storage
        chrome.storage.sync.remove('categorizedTabs', function() {
            console.log('Categorized state is cleared');
        });
    
        // Ungroup the Chrome tabs
        chrome.tabs.query({}, function(tabs) {
            tabsList.innerHTML = '';
            for (let tab of tabs) {

                chrome.tabs.ungroup(tab.id)

        
                const tabItem = document.createElement('div');
                tabItem.classList.add('tab_section');
                const tabIcon = document.createElement('img');
    
                if (tab.favIconUrl) {
                    tabIcon.src = tab.favIconUrl;
                } else {
                    tabIcon.src = 'noIcon.png';
                }
                
                tabIcon.classList.add('tab-icon');
                const tabTitle = document.createElement('span');
                tabTitle.textContent = tab.title;
                tabTitle.classList.add('tab_title')
                tabItem.appendChild(tabIcon);
                tabItem.appendChild(tabTitle);
                
    
                const clockIcon = document.createElement('img');
                clockIcon.src = 'clock icon.png';
                clockIcon.classList.add('clock');
    
    
                const currentTime = new Date();
                const tabDuration = document.createElement('span');
                const deactivatedDuration = Math.round((currentTime - tab.lastAccessed)/1000);
                const deactivatedDuration_sec = Math.round(deactivatedDuration%60);
                const deactivatedDuration_min_raw = Math.floor(deactivatedDuration/60);
                const deactivatedDuration_min = Math.floor(deactivatedDuration_min_raw%60);
                const deactivatedDuration_hour = Math.floor(deactivatedDuration_min_raw/60);
    
                if (!(deactivatedDuration_hour===0))
                    tabDuration.textContent = `${deactivatedDuration_hour.toLocaleString('en-US', {
                        minimumIntegerDigits:2,
                        useGrouping: false})}:${deactivatedDuration_min.toLocaleString('en-US', {
                            minimumIntegerDigits:2,
                            useGrouping: false})}:${deactivatedDuration_sec.toLocaleString('en-US', {
                                minimumIntegerDigits:2,
                                useGrouping: false})}`
                else if (!(deactivatedDuration_min===0))
                    tabDuration.textContent = `00:${deactivatedDuration_min.toLocaleString('en-US', {
                        minimumIntegerDigits:2,
                        useGrouping: false})}:${deactivatedDuration_sec.toLocaleString('en-US', {
                        minimumIntegerDigits:2,
                        useGrouping: false})}`
                else 
                    tabDuration.textContent = `00:00:${deactivatedDuration_sec.toLocaleString('en-US', {
                        minimumIntegerDigits:2,
                        useGrouping: false})}`
    
                const clockAndTabDuration = document.createElement('span');
                clockAndTabDuration.appendChild(clockIcon);
                clockAndTabDuration.appendChild(tabDuration);
                tabItem.appendChild(clockAndTabDuration)
    
                
                
                tabsList.appendChild(tabItem);
                tabItem.addEventListener('click', () => {
                    chrome.tabs.update(tab.id, { active: true });
            });
        }});
    
        // Refresh the UI to reflect the ungrouped state
        // This will depend on your specific implementation
    });
    function categorizeTabs() {
        grouped = true;
        const apiKey = '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'; // Replace with your OpenAI API key
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        
            chrome.tabs.query({}, function(tabs) {
                const requests = tabs.map(tab => {
                    const prompt = `Title: ${tab.title}. Content: ${tab.url} For these websites, select one best matching among: [Productivity, Entertainment, News, Social, Education, Miscellaneous] Limit your answer to one word. Avoid writing '.' or ''' in your answer.`;
        
                    const requestData = {
                        model: 'gpt-4',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a helpful assistant.',
                            },
                            {
                                role: 'user',
                                content: prompt,
                            },
                        ],
                    };
        
                    return fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${apiKey}`,
                        },
                        body: JSON.stringify(requestData),
                    })
                        .then(response => response.json())
                        .then(data => {
                            const predictedCategory = data.choices[0].message.content;
                            return { tab, predictedCategory };
                        });
                });
        
                Promise.all(requests)
                    .then(results => {
                        groupAndDisplayTabs(results);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
        }
        
        function groupAndDisplayTabs(results) {
            const categorizedTabs = {};
        
            results.forEach(({ tab, predictedCategory }) => {
                if (!categorizedTabs[predictedCategory]) {
                    categorizedTabs[predictedCategory] = [];
                }
        
                categorizedTabs[predictedCategory].push(tab);
            });
        
            const groupPromises = Object.entries(categorizedTabs).map(([category, tabs]) => {
                return new Promise(resolve => {
                    chrome.tabs.group({ tabIds: tabs.map(tab => tab.id) }, function (groupId) {
                        resolve({ category, groupId });
                    });
                });
            });
        
            Promise.all(groupPromises)
                .then(groups => {
                    saveGroupedTabsToStorage(categorizedTabs);
                    displayGroupedTabsInfo(categorizedTabs);
                })
                .catch(error => {
                    console.error('Error grouping tabs:', error);
                });
        }

        function saveGroupedTabsToStorage(categorizedTabs) {
            chrome.storage.local.set({ categorizedTabs: categorizedTabs }, function () {
                console.log('Tabs categorized and saved to storage.');
            });
        }
        
        function displayGroupedTabsInfo(categorizedTabs) {
            chrome.tabs.query({}, tabs => {
                const tabsList = document.getElementById('tabsList');
                tabsList.innerHTML = ''; // Clear previous information
        
                Object.entries(categorizedTabs).forEach(([category, tabs]) => {
                    const categoryInfo = document.createElement('div');
                    categoryInfo.classList.add('categoryInfo');
                    categoryInfo.textContent = `${category}`;
                    tabsList.appendChild(categoryInfo);
        
                    tabs.forEach(tab => {
                        const tabItem = document.createElement('div');
                        tabItem.classList.add('tab_section');
                        const tabIcon = document.createElement('img');
                        
            
            
                        if (tab.favIconUrl) {
                            tabIcon.src = tab.favIconUrl;
                        } else {
                            tabIcon.src = 'noIcon.png';
                        }
                        
                        
                    
            
            
            
            
                        
                        tabIcon.classList.add('tab-icon');
                        const tabTitle = document.createElement('span');
                        tabTitle.textContent = tab.title;
                        tabTitle.classList.add('tab_title')
                        tabItem.appendChild(tabIcon);
                        tabItem.appendChild(tabTitle);
                        
            
                        const clockIcon = document.createElement('img');
                        clockIcon.src = 'clock icon.png';
                        clockIcon.classList.add('clock');
            
            
                        const currentTime = new Date();
                        const tabDuration = document.createElement('span');
                        const deactivatedDuration = Math.round((currentTime - tab.lastAccessed)/1000);
                        const deactivatedDuration_sec = Math.round(deactivatedDuration%60);
                        const deactivatedDuration_min_raw = Math.floor(deactivatedDuration/60);
                        const deactivatedDuration_min = Math.floor(deactivatedDuration_min_raw%60);
                        const deactivatedDuration_hour = Math.floor(deactivatedDuration_min_raw/60);
            
                        
                        if (!(deactivatedDuration_hour===0))
                            tabDuration.textContent = `${deactivatedDuration_hour.toLocaleString('en-US', {
                                minimumIntegerDigits:2,
                                useGrouping: false})}:${deactivatedDuration_min.toLocaleString('en-US', {
                                    minimumIntegerDigits:2,
                                    useGrouping: false})}:${deactivatedDuration_sec.toLocaleString('en-US', {
                                        minimumIntegerDigits:2,
                                        useGrouping: false})}`
                        else if (!(deactivatedDuration_min===0))
                            tabDuration.textContent = `00:${deactivatedDuration_min.toLocaleString('en-US', {
                                minimumIntegerDigits:2,
                                useGrouping: false})}:${deactivatedDuration_sec.toLocaleString('en-US', {
                                minimumIntegerDigits:2,
                                useGrouping: false})}`
                        else 
                            tabDuration.textContent = `00:00:${deactivatedDuration_sec.toLocaleString('en-US', {
                                minimumIntegerDigits:2,
                                useGrouping: false})}`
            
                        const clockAndTabDuration = document.createElement('span');
                        clockAndTabDuration.appendChild(clockIcon);
                        clockAndTabDuration.appendChild(tabDuration);
                        tabItem.appendChild(clockAndTabDuration)
            
                        
                        
                        tabsList.appendChild(tabItem);
                        tabItem.addEventListener('click', () => {
                            chrome.tabs.update(tab.id, { active: true });
                        });
                    });
        
                    
                }); 
            });
        }
        
        if (grouped){
            chrome.storage.local.get('categorizedTabs', function (result) {
                const categorizedTabs = result.categorizedTabs;
                if (categorizedTabs) {
                    displayGroupedTabsInfo(categorizedTabs);
                }
            });
        }
        else {

        }
        
        
        // Trigger the categorization when the button is clicked
        const categorizeBtn = document.getElementById('categorizeBtn');
        categorizeBtn.addEventListener('click', categorizeTabs);
    });
    