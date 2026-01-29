"""add nexra_output to idea

Revision ID: dacaefed6ec0
Revises: 8c0da037a298
Create Date: 2026-01-29 04:29:52.470933

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dacaefed6ec0'
down_revision: Union[str, Sequence[str], None] = '8c0da037a298'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.add_column('idea', sa.Column('nexra_output', sa.Text(), nullable=True))

def downgrade():
    op.drop_column('idea', 'nexra_output')

