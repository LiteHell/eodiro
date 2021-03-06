import $ from './style.module.scss'
import React from 'react'
import classNames from 'classnames'

const ServerError: React.FC<{ raw?: boolean }> = ({ raw }) => {
  return (
    <div className={classNames($['server-error'], raw && $['raw'])}>
      <h3 className={$['header']}>⚠️ 서버에 문제가 발생했습니다.</h3>
      <p className={$['info']}>
        문제가 지속될 시,{' '}
        <a href="mailto:contact@payw.org" className={$['email-address']}>
          contact@payw.org
        </a>
        로 문의 바랍니다.
      </p>
    </div>
  )
}

export default ServerError
