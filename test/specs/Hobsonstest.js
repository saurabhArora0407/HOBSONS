describe('webdriver.io page', () => {
    //##################### START - Setting values to be compared ##########################################
    const honsons = {
        pageTitle: 'We help students across the journey of a lifetime.',
        eventsText: 'Events',
      };
      //We can also use json array for this 
      const expectedArrayList = ["FADSS Winter Leadership Conference","NSSR (National Symposium on Student Retention)","APLU Annual Meeting",
                            "NACADA 2019","ERDI Winter 2020","AASA NCE 2020","TASA 2020","CGCS 2019","ERDI Summer 202"]  
//##################### END - Setting values to be compared ##########################################

// hard coding objects and data for now in this file but it should be picked from external files for reusability

    //##################### START - Test case Execution ##########################################
    it('page loaded with expected title', () => {
       // Navigating to URL
        browser.url('https://www.hobsons.com/')
        const pageTitle = $('[class="pagetitle c"]')
        expect(pageTitle.getText()).toContain(honsons.pageTitle);
    }),

    it('checking sections are correctly aligned', () => {
        var path = require('path');
        const scrollDown = $('[class="fas fa-chevron-down"]')
        scrollDown.click()
        //waiting for browser to scroll down , ideally should be a smart wait
        browser.pause(3000)
        expect(browser.checkScreen('examplePaged', {baselineFolder: path.join(process.cwd(),'./test/imageBaseline/'),autoSaveBaseline: false,})).toEqual(0);
    }),

    it('verifying Menu Resources contains Events', () => {        
        const menu = $('[class="menu"]')
        menu.click();
        const menuResources = $('a=Resources')

        //Smart wait for resource object
        browser.waitUntil(() => menuResources.getText() == 'RESOURCES', {
            timeout: 5000,
          });
         
        menuResources.click();
        //Event Link Object
        const eventsLink = $('[href="https://www.hobsons.com/resources/events"');
        expect(eventsLink.getText()).toContain(honsons.eventsText);
        eventsLink.click();
    }),
              
    it('verifying all the expected events displayed as expected', () => {        
        const eventList= browser.$$('[class="txt"]') 
        eventList.forEach(element => {
            expect(expectedArrayList.includes(element))
          });
    })
    //##################### END - Test case Execution ##########################################    
})