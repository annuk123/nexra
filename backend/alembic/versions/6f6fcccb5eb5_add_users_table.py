"""add users table

Revision ID: 6f6fcccb5eb5
Revises: dacaefed6ec0
Create Date: 2026-02-09 07:30:24.935162

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6f6fcccb5eb5'
down_revision: Union[str, Sequence[str], None] = 'dacaefed6ec0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
