from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

def get_tweets_with_scraping(username):
    url = f"https://twitter.com/{username}"

    chrome_options = Options()
    driver = webdriver.Chrome(executable_path='/Users/ressurd/RN/chromedriver_mac64', options=chrome_options)
    driver.get(url)

    time.sleep(5)  # 페이지 로딩을 기다림

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    tweet_elements = soup.find_all('div', attrs={"data-testid": "tweet"})

    tweet_data = []
    for tweet in tweet_elements:
        content = tweet.find('div', class_='css-901oao r-jwli3a r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0').text
        date_element = tweet.find('time')
        date = date_element['datetime'] if date_element else 'Unknown Date'
        tweet_data.append({
            "title": f"Tweet from {username}",
            "date": date.split("T")[0],
            "content": content
        })
    driver.quit()
    return tweet_data

# 사용 예시:
data = get_tweets_with_scraping("LimbusCompany_B")
print(data)
