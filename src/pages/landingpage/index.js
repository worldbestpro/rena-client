import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import cx from 'classnames'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { Categories } from 'constants/filter.constants'
import HeaderActions from 'actions/header.actions'
import FilterActions from 'actions/filter.actions'
import Header from 'components/Header'

import card1 from 'assets/svgs/card1.svg'
import card2 from 'assets/svgs/card2.svg'
import card3 from 'assets/svgs/card3.svg'
import card4 from 'assets/svgs/card4.svg'
import search from 'assets/svgs/magnifier.svg'

import styles from './styles.module.scss'

const cards = [
  {
    icon: card1,
    title: 'Easy Connect',
    description:
      'Using Metamask or CoinBase Wallet. Just click "Connect Wallet" on the top right to start.',
    path: '/',
  },
  {
    icon: card2,
    title: 'Super Fast',
    description:
      'Since Rena runs on the Fantom Opera Network, transactions are usually confirmed within 1-2 seconds.',
    path: '/',
  },
  {
    icon: card3,
    title: 'Low Transaction Fees',
    description:
      'Transactions are usually just a few cents, allowing users to create and trade many NFTs without prohibitively high network fees.',
    path: '/',
  },
  {
    icon: card4,
    title: 'Zero Platform Fees',
    description:
      'Trade NFTs via auction or direct offer without any fees taken by Rena.',
    path: '/explore',
  },
]

const LandingPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(HeaderActions.toggleSearchbar(false))
    dispatch(FilterActions.updateCategoryFilter(null))
  }, [])

  const handleViewCategory = (id) => {
    dispatch(FilterActions.updateCategoryFilter(id === 'all' ? null : id))
    history.push('/explore')
  }

  const renderAboutCard = (key, icon, title, desc, path) => (
    <div className={styles.aboutCard} key={key}>
      <NavLink to={path} className={styles.aboutCardLink}>
        <div className={styles.cardIconWrapper}>
          <img src={icon} />
        </div>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardDesc}>{desc}</div>
      </NavLink>
    </div>
  )

  const renderCategoryCard = (key, icon, label, extra = false) => (
    <div
      className={styles.categoryCard}
      key={key}
      onClick={() => handleViewCategory(key)}
    >
      <div className={styles.cardIconWrapper2}>
        <img src={icon} />
      </div>
      <div className={cx(styles.cardLabelWrapper, extra && styles.extraCard)}>
        <div className={styles.cardLabel}>{label}</div>
        <div className={styles.browseBtn}>
          <ChevronRightIcon className={styles.browseBtnIcon} />
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.main}>
          <img src="/favicon.png" alt="logo" width={400} height={400} />
          <span className={styles.aboutTitle} style={{ marginTop: 0 }}>
            Rena Finance
          </span>
        </div>
        <div className={styles.about}>
          <div className={styles.aboutInner}>
            <div className={styles.aboutTitle}>Why Rena</div>
            <div className={styles.aboutCards}>
              {cards.map((card, key) =>
                renderAboutCard(
                  key,
                  card.icon,
                  card.title,
                  card.description,
                  card.path
                )
              )}
            </div>
            <div className={styles.aboutTitle}>Browse by category</div>
            <div className={styles.categories}>
              {Categories.map((cat) =>
                renderCategoryCard(cat.id, cat.icon, cat.label)
              )}
              {renderCategoryCard('all', search, 'Explore All NFTs', true)}
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.terms}>
            <a
              style={{ textDecoration: 'none', color: '#FFFFFF' }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://app.termly.io/document/privacy-policy/7db4b9fc-aa5d-4f80-bfa1-27120ff982ba"
            >
              Privacy Policy
            </a>
            <a
              style={{ textDecoration: 'none', color: '#FFFFFF' }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://app.termly.io/document/cookie-policy/c79f1a78-08a2-4da2-85f0-846a461cde81"
            >
              Cookie Policy
            </a>
            <a
              style={{ textDecoration: 'none', color: '#FFFFFF' }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://app.termly.io/document/terms-of-use-for-online-marketplace/1f69b33f-65ba-40d9-bf63-b28e357f7c34"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
